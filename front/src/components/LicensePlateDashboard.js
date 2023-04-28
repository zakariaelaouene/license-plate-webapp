import React, { useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

function LicensePlateDashboard() {
  const data = [
    {
      licence_plate: "65463-A-45",
      date: "2023-01-01",
      location: "Location A",
      flag: "G",
      owner: "Mohamed Amine",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "27546-E-12",
      date: "2023-01-03",
      location: "Location C",
      flag: "R",
      owner: "Ahmed El Kadi",
      description: "Driving with a suspended license",
      status: "Check violation",
    },
    {
      licence_plate: "15631-H-29",
      date: "2023-01-04",
      location: "Location D",
      flag: "G",
      owner: "Naima Ouarzaz",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "46321-A-78",
      date: "2023-01-05",
      location: "Location E",
      flag: "Y",
      owner: "Abderrahim Benali",
      description: "Illegal parking",
      status: "OK",
    },
    {
      licence_plate: "58932-B-9",
      date: "2023-01-06",
      location: "Location A",
      flag: "Y",
      owner: "Hassan Idrissi",
      description: "Expired insurance",
      status: "OK",
    },
    {
      licence_plate: "97842-D-30",
      date: "2023-01-07",
      location: "Location B",
      flag: "R",
      owner: "Sara El Mansouri",
      description: "Unpaid traffic fines",
      status: "Check violation",
    },
    {
      licence_plate: "63251-E-44",
      date: "2023-01-08",
      location: "Location C",
      flag: "G",
      owner: "Karim Belhaj",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "42136-H-86",
      date: "2023-01-09",
      location: "Location D",
      flag: "Y",
      owner: "Houda Ait Benhaddou",
      description: "Running a red light",
      status: "OK",
    },
    {
      licence_plate: "364986-WW",
      date: "2023-01-10",
      location: "Location E",
      flag: "G",
      owner: "Anas El Khamlichi",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "98456-A-61",
      date: "2023-01-11",
      location: "Location A",
      flag: "Y",
      owner: "Mounir El Maataoui",
      description: "Speeding - 15 km/h over limit",
      status: "OK",
    },
    {
      licence_plate: "23541-B-16",
      date: "2023-01-12",
      location: "Location B",
      flag: "R",
      owner: "Laila Berrada",
      description: "Driving without insurance",
      status: "Check violation",
    },
    {
      licence_plate: "75628-D-33",
      date: "2023-01-13",
      location: "Location C",
      flag: "G",
      owner: "Mehdi El Fassi",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "82431-E-55",
      date: "2023-01-14",
      location: "Location D",
      flag: "Y",
      owner: "Omar Farid",
      description: "Illegal U-turn",
      status: "OK",
    },
    {
      licence_plate: "16234-H-91",
      date: "2023-01-15",
      location: "Location E",
      flag: "R",
      owner: "Salma El Alaoui",
      description: "Reckless driving",
      status: "Check violation",
    },
    {
      licence_plate: "41357-A-68",
      date: "2023-01-16",
      location: "Location A",
      flag: "G",
      owner: "Rachid El Mokri",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "84276-D-4",
      date: "2023-01-17",
      location: "Location B",
      flag: "Y",
      owner: "Soukaina Ait Melloul",
      description: "Speeding - 20 km/h over limit",
      status: "OK",
    },
    {
      licence_plate: "29361-E-26",
      date: "2023-01-18",
      location: "Location C",
      flag: "R",
      owner: "Adil El Kettani",
      description: "Driving without a seatbelt",
      status: "Check violation",
    },
    {
      licence_plate: "17632-H-39",
      date: "2023-01-19",
      location: "Location D",
      flag: "G",
      owner: "Lamia Bouchiba",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "57842-A-83",
      date: "2023-01-20",
      location: "Location E",
      flag: "Y",
      owner: "Mustapha El Hadri",
      description: "Using a mobile phone while driving",
      status: "OK",
    },
    {
      licence_plate: "49652-B-18",
      date: "2023-01-21",
      location: "Location A",
      flag: "R",
      owner: "Imane Aziz",
      description: "Expired registration",
      status: "Check violation",
    },
    {
      licence_plate: "83759-D-31",
      date: "2023-01-22",
      location: "Location B",
      flag: "G",
      owner: "Khalid Oujda",
      description: "N/A",
      status: "OK",
    },
    {
      licence_plate: "26851-E-47",
      date: "2023-01-23",
      location: "Location C",
      flag: "Y",
      owner: "Aicha El Omari",
      description: "Failure to signal",
      status: "OK",
    },
    {
      licence_plate: "48162-H-92",
      date: "2023-01-24",
      location: "Location D",
      flag: "R",
      owner: "Hakim El Joundi",
      description: "Driving without a valid inspection",
      status: "Check violation",
    },
    {
      licence_plate: "7851-D-1",
      date: "2023-01-02",
      location: "Location B",
      flag: "Y",
      owner: "Fatima Zahra",
      description: "Speeding - 10 km/h over limit",
      status: "OK",
    },
    // add more data here
  ];

  const columns = [
    {
      Header: "License Plate Number",
      accessor: "licence_plate",
    },
    {
      Header: "Owner",
      accessor: "owner",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Time",
      accessor: "date",
    },
    {
      Header: "Flag",
      accessor: "flag",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => (
        <div className={`status ${value.toLowerCase()}`}>{value}</div>
      ),
    },
    {
      Header: "",
      accessor: "",
      Cell: ({ original }) => (
        <button
          className={`fix-now ${original.flag.toLowerCase()} ${
            original.flag === "R" ? "red" : ""
          }`}
          disabled={original.status !== "Violation"}
          onClick={() => handleFixNow(original)}
        >
          Fix Now
        </button>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleFixNow = (rowData) => {
    // handle fix now action here
  };

  const pageSize = 15;
  const pageCount = Math.ceil(data.length / pageSize);

  return (
    // <div className="license-plate-dashboard" style={{ margin: "auto" }}>
      <ReactTable
        data={data.slice(currentPage * pageSize, (currentPage + 1) * pageSize)}
        columns={columns}
        defaultPageSize={pageSize}
        showPageSizeOptions={false}
        manual
        pages={pageCount}
        onPageChange={(pageIndex) => handlePageChange(pageIndex)}
        style={{ width: "100%" }} // set the width to 150%
        className="-striped -highlight" // added className for table styling
      />
    // </div>
  );
}

export default LicensePlateDashboard;

////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import api from '../services/api'; // Import the API file
// import React, { useState } from 'react';
// import ReactTable from 'react-table-6';
// import 'react-table-6/react-table.css';

// function LicensePlateDashboard() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.getLicensePlates();
//         setData(response);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     {
//       Header: 'License Plate Number',
//       accessor: 'licence_plate',
//     },
//     {
//       Header: 'Owner',
//       accessor: 'owner',
//     },
//     {
//       Header: 'Location',
//       accessor: 'location',
//     },
//     {
//       Header: 'Time',
//       accessor: 'date',
//     },
//     {
//       Header: 'Flag',
//       accessor: 'flag',
//     },
//     {
//       Header: 'Description',
//       accessor: 'description',
//     },
//     {
//       Header: 'Status',
//       accessor: 'status',
//       Cell: ({ value }) => (
//         <div className={`status ${value.toLowerCase()}`}>{value}</div>
//       ),
//     },
//     {
//       Header: '',
//       accessor: '',
//       Cell: ({ original }) => (
//         <button
//           className={`fix-now ${original.flag.toLowerCase()} ${original.flag === 'R' ? 'red' : ''}`}
//           disabled={original.status !== 'Violation'}
//           onClick={() => handleFixNow(original)}
//         >
//           Fix Now
//         </button>
//       ),
//     },
//   ];

//   const [currentPage, setCurrentPage] = useState(0);

//   const handlePageChange = (pageIndex) => {
//     setCurrentPage(pageIndex);
//   };

//   const handleFixNow = (rowData) => {
//     // handle fix now action here
//   };

//   const pageSize = 15;
//   const pageCount = Math.ceil(data.length / pageSize);

//   return (
//     <div className="license-plate-dashboard" style={{ margin: 'auto' }}>
//   <ReactTable
//     data={data.slice(
//       currentPage * pageSize,
//       (currentPage + 1) * pageSize
//     )}
//     columns={columns}
//     defaultPageSize={pageSize}
//     showPageSizeOptions={false}
//     manual
//     pages={pageCount}
//     onPageChange={(pageIndex) => handlePageChange(pageIndex)}
//     style={{ width: '150%' }} // set the width to 150%
//     className="-striped -highlight" // added className for table styling
//   />
// </div>
//   );
// }

// export default LicensePlateDashboard;
