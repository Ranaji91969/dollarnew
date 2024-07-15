import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Todo = () => {
    const navigate = useNavigate();

    const [todoData, setTodoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('LeadNo');
    const [searchValue, setSearchValue] = useState('');
    const [startDate, setStartDate] = useState(new Date('2023-12-01'));
    const [endDate, setEndDate] = useState(new Date('2024-07-15'));
    const [statusType, setStatusType] = useState('All');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formattedStartDate = startDate.toISOString().split('T')[0];
                const formattedEndDate = endDate.toISOString().split('T')[0];

                const requestBody = new URLSearchParams({
                    URL: 'https://dollarsoftware.in/CrmWebService.asmx',
                    SoapBody: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetJsonLeadData xmlns="http://dollarsoftware.in">
      <Sdate>${formattedStartDate}</Sdate>
      <Edate>${formattedEndDate}</Edate>
    </GetJsonLeadData>
  </soap:Body>
</soap:Envelope>`,
                    SoapAction: 'http://dollarsoftware.in/GetJsonLeadData'
                });

                const response = await fetch('/SoapAPI.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: requestBody.toString()
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.text();
                const parsedData = JSON.parse(data);
                setTodoData(parsedData);
                setFilteredData(parsedData);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleStatusChange = (e) => {
        setStatusType(e.target.value);
    };

    const handleSearch = () => {
        let updatedFilteredData = [...todoData];

        if (searchValue.trim() !== '') {
            updatedFilteredData = updatedFilteredData.filter(item =>
                String(item[selectedFilter]).toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (statusType !== 'All') {
            updatedFilteredData = updatedFilteredData.filter(item =>
                item.StatusType === statusType
            );
        }

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        updatedFilteredData = updatedFilteredData.filter(item => {
            const leadDate = new Date(
                parseInt(item.LeadDated.substring(6, 10)),
                parseInt(item.LeadDated.substring(3, 5)) - 1,
                parseInt(item.LeadDated.substring(0, 2))
            );

            return leadDate >= startDateObj && leadDate <= endDateObj;
        });

        setFilteredData(updatedFilteredData);

        navigate('/search-results', { state: { filteredData: updatedFilteredData } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='Container'>
            <div className='MainFilter'>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                />
                <select value={statusType} onChange={handleStatusChange}>
                    <option value="All">All</option>
                    <option value="Followup">Followup</option>
                    <option value="Close">Close</option>
                    <option value="Convert2Enquiry">Convert2Enquiry</option>
                </select>
                <button2 onClick={handleSearch}>Search</button2>
            </div>
        </div>
    );
};

export default Todo;
