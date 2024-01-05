import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
    const [data, setData] = useState({
        res: null,
        updatedClassMap: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/fetch_data');
                setData({
                    res: response.data.res,
                    updatedClassMap: response.data.updated_class_map_json,
                });
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };


        fetchData();
    }, []);

    return (
        <div>
            <h2>Res: {data.res}</h2>
            <h2>Updated Class Map:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    {data.updatedClassMap &&
                        Object.entries(data.updatedClassMap).map(([className, values]) => (
                            <tr key={className}>
                                <td>{className}</td>
                                <td>
                                    <ul>
                                        {values.map(([name, value]) => (
                                            <li key={name}>
                                                {name}: {value}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataDisplay;
