import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    
   
    const initialFilteredData = useMemo(() => location.state?.filteredData || [], [location.state?.filteredData]);

    const [selectedFilter, setSelectedFilter] = useState('LeadNo');
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState(initialFilteredData);

    useEffect(() => {
       
        setFilteredData(initialFilteredData);
    }, [initialFilteredData]);

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const handleSearchInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleResetFilters = () => {
        setFilteredData(initialFilteredData);
        setSearchValue('');
    };

    const filteredResults = filteredData.filter((item) => {
        const searchValueLower = searchValue.toLowerCase();
        const fieldToSearch = String(item[selectedFilter]);
        return fieldToSearch.toLowerCase().includes(searchValueLower);
    });

    return (
        <div className='Container'>
            <div className='Dropdown'>
                <select value={selectedFilter} onChange={handleFilterChange}>
                    <option value="LeadNo">Lead No</option>
                    <option value="LeadDated">Lead Date</option>
                    <option value="Organization">Organization</option>
                    <option value="ContactPersonName">Contact Person</option>
                    <option value="MobNo">Mobile No</option>
                    <option value="TradeTypeName">Trade Type</option>
                    <option value="Adrees">Address</option>
                    <option value="CityName">City</option>
                    <option value="AreaName">Area</option>
                    <option value="SourceName">Source</option>
                    <option value="Prod1Name">Product</option>
                    <option value="Prod2Name">Product</option>
                    <option value="Prod3Name">Product</option>
                    <option value="Prod4Name">Product</option>
                    <option value="Prod5Name">Product</option>
                    <option value="StatusType">Status</option>
                    <option value="FollowupDated">Followup Date</option>
                    <option value="Remark">Remark</option>
                    <option value="AllocatedTo">Allocated To</option>
                </select>
            </div>

            <div className='TextBox'>
                <input
                    type="text"
                    id="search-value"
                    placeholder="Enter a value"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <button3 onClick={handleResetFilters}>Reset</button3>
            </div>

            <div className='Leads'>
                <h1>Leads</h1>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Lead No</th>
                            <th style={{ border: '1px solid black' }}>Lead Date</th>
                            <th style={{ border: '1px solid black' }}>Organization</th>
                            <th style={{ border: '1px solid black' }}>Contact Person</th>
                            <th style={{ border: '1px solid black' }}>Mobile No</th>
                            <th style={{ border: '1px solid black' }}>Trade Type</th>
                            <th style={{ border: '1px solid black' }}>Address</th>
                            <th style={{ border: '1px solid black' }}>City</th>
                            <th style={{ border: '1px solid black' }}>Area</th>
                            <th style={{ border: '1px solid black' }}>Source</th>
                            <th style={{ border: '1px solid black' }}>Product</th>
                            <th style={{ border: '1px solid black' }}>Product</th>
                            <th style={{ border: '1px solid black' }}>Product</th>
                            <th style={{ border: '1px solid black' }}>Product</th>
                            <th style={{ border: '1px solid black' }}>Product</th>
                            <th style={{ border: '1px solid black' }}>Status</th>
                            <th style={{ border: '1px solid black' }}>Followup Date</th>
                            <th style={{ border: '1px solid black' }}>Remark</th>
                            <th style={{ border: '1px solid black' }}>Allocated To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black' }}>{item.LeadNo}</td>
                                <td style={{ border: '1px solid black' }}>{item.LeadDated}</td>
                                <td style={{ border: '1px solid black' }}>{item.Organization}</td>
                                <td style={{ border: '1px solid black' }}>{item.ContactPersonName}</td>
                                <td style={{ border: '1px solid black' }}>{item.MobNo}</td>
                                <td style={{ border: '1px solid black' }}>{item.TradeTypeName}</td>
                                <td style={{ border: '1px solid black' }}>{item.Adrees}</td>
                                <td style={{ border: '1px solid black' }}>{item.CityName}</td>
                                <td style={{ border: '1px solid black' }}>{item.AreaName}</td>
                                <td style={{ border: '1px solid black' }}>{item.SourceName}</td>
                                <td style={{ border: '1px solid black' }}>{item.Prod1Name}</td>
                                <td style={{ border: '1px solid black' }}>{item.Prod2Name}</td>
                                <td style={{ border: '1px solid black' }}>{item.Prod3Name}</td>
                                <td style={{ border: '1px solid black' }}>{item.Prod4Name}</td>
                                <td style={{ border: '1px solid black' }}>{item.Prod5Name}</td>
                                <td style={{ border: '1px solid black' }}>{item.StatusType}</td>
                                <td style={{ border: '1px solid black' }}>{item.FollowupDated}</td>
                                <td style={{ border: '1px solid black' }}>{item.Remark}</td>
                                <td style={{ border: '1px solid black' }}>{item.AllocatedTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchResults;
