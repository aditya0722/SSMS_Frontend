import React, { useState, useEffect } from 'react';
import { MenuItem, Select, Snackbar,Box,Container, Alert, Checkbox, FormControlLabel } from '@mui/material';
import AdminNav from './AdminNav';
import SidebarMenu from './SidebarMenu';
import ProgressBar from './ProgressBar';
import Spinner from './Spinner';
import axios from 'axios';

const AttendanceManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [data, setData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarCollapsed(mobile); // Collapse sidebar on mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://ssmss-backend.onrender.com/api/login/members");
        // Transform the data to an array of member objects
        const memberList = data.map(member => ({
          id: member._id, // assuming the backend returns member IDs
          name: member.name,
        }));
        setMembers(memberList);
      } catch (error) {
        console.error("Error fetching members data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const saveAttendanceData = async (attendanceData) => {
    try {
      setLoading(true);
      await axios.post('https://ssmss-backend.onrender.com/api/attendance', attendanceData);
      setSnackbar({ open: true, message: 'Data saved successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error saving data', severity: 'error' });
      console.error('Error saving attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (memberId, date, type, value) => {
    try {
      setLoading(true);
      if (type === 'attendance') {
        await axios.post("https://ssmss-backend.onrender.com/api/addAttandance", {
          memberId,
          date,
          status: value,
        });
      } else if (type === 'fee') {
        await axios.post("https://ssmss-backend.onrender.com/api/addmonthlyfee", {
          memberId,
          date,
          status: value,
        });
      }
      setData((prevData) => ({
        ...prevData,
        [memberId]: {
          ...prevData[memberId],
          [date]: {
            ...prevData[memberId]?.[date],
            [type]: value,
          },
        },
      }));
      setSnackbar({ open: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully`, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Error saving ${type}`, severity: 'error' });
      console.error(`Error saving ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (memberId, date, checked) => {
    setData((prevData) => ({
      ...prevData,
      [memberId]: {
        ...prevData[memberId],
        [date]: {
          ...prevData[memberId]?.[date],
          fine: checked,
        },
      },
    }));
    saveAttendanceData({ memberId, date, type: 'fine', value: checked });
  };

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const getFirstSundays = (year) => {
    const firstSundays = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const day = date.getDay();
      const firstSunday = day === 0 ? date : new Date(year, month, 1 + (7 - day));
      firstSundays.push(firstSunday);
    }
    return firstSundays;
  };

  const firstSundays = getFirstSundays(new Date().getFullYear());

  const getCellColor = (value) => {
    switch (value) {
      case 'Present':
        return '#d4edda'; // light green
      case 'Absent':
        return '#f8d7da'; // light red
      case 'Leave':
        return '#fff3cd'; // light yellow
      default:
        return 'transparent';
    }
  };

  const getFeeColor = (value) => {
    switch (value) {
      case 'Paid':
        return '#d4edda'; // light green
      case 'Late Paid':
        return '#fff3cd'; // light yellow
      default:
        return 'transparent';
    }
  };

  const calculateTotals = (memberId) => {
    const memberData = data[memberId] || {};
    let totalDaysPresent = 0;
    let totalFees = 0;

    Object.values(memberData).forEach(record => {
      if (record.attendance === 'Present') {
        totalDaysPresent += 1;
      } 
        if (record.fine) {
          totalFees += 100;
        }
      
      if (record.fee === 'Paid') {
        totalFees += 50;
      }
      if (record.fee === 'Late Paid') {
        totalFees += 100;
      }
    });

    return { totalDaysPresent, totalFees };
  };
  const calculateSummary = () => {
    let totalFeeCollection = 0;
    let totalAbsent = 0;
    let totalPresent = 0;
    let totalLateFeeCollection = 0;
    let totalAbsentFeeCollection = 0;
  
    members.forEach(member => {
      const memberData = data[member.id] || {};
      Object.values(memberData).forEach(record => {
        if (record.attendance === 'Present') {
          totalPresent += 1;
        } else if (record.attendance === 'Absent') {
          totalAbsent += 1;
          if (record.fine) {
            totalAbsentFeeCollection += 100;
          }
        }
  
        if (record.fee === 'Paid') {
          totalFeeCollection += 50;
        } else if (record.fee === 'Late Paid') {
          totalFeeCollection += 100;
          totalLateFeeCollection += 100;
        }
      });
    });
  
    return {
      totalFeeCollection,
      totalAbsent,
      totalPresent,
      totalLateFeeCollection,
      totalAbsentFeeCollection
    };
  };
  const summary = calculateSummary();
  

  return (
    <>
      <ProgressBar loading={loading} />
      <Spinner loading={loading} />
      <AdminNav toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <div className={`transition-transform duration-300 ${isSidebarCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
          <SidebarMenu collapsed={isSidebarCollapsed} />
        </div>
        <div style={{ flex: 1, padding: '10px', overflowX: 'auto' }}>
          <div>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ marginBottom: '20px', width: '200px' }}
              sx={{
                '& .MuiSelect-icon': { display: 'none' } // Hides the dropdown icon
              }}
            >
              {firstSundays.map((date, index) => (
                <MenuItem key={index} value={index}>
                  {formatDate(date)}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div style={{ overflowX: 'auto', height: "auto", overflowY: "hidden" }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ position: 'sticky', left: 0, zIndex: 1, border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap' }}>Member Name</th>
                  {firstSundays.map((date, index) => (
                    <th key={index} colSpan={3} style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>
                      {formatDate(date)}
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                        <div style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>
                          Attendance
                        </div>
                        <div style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>
                          Monthly Fee
                        </div>
                        <div style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>
                          Fine
                        </div>
                      </div>
                    </th>
                  ))}
                  <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5' }}>Total Days Present</th>
                  <th style={{ border: '1px solid #ddd', padding: '4px', backgroundColor: '#f5f5f5' }}>Total Fees</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  const totals = calculateTotals(member.id);
                  return (
                    <>
                    <tr key={member.id}>
                      <td style={{ position: 'sticky', left: 0, zIndex: 1, border: '1px solid #ddd', padding: '0px', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: '#f5f5f5' }}>
                        {member.name}
                      </td>
                      
                      {firstSundays.map((date, index) => {
                        const formattedDate = formatDate(date);
                        const cellData = data[member.id]?.[formattedDate] || {};
                        const attendanceValue = cellData.attendance || '';
                        const feeValue = cellData.fee || '';
                        const fineValue = cellData.fine || false;
                        return (
                          <React.Fragment key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '0px', backgroundColor: getCellColor(attendanceValue) }}>
                              <Select
                                value={attendanceValue}
                                onChange={(e) => handleChange(member.id, formattedDate, 'attendance', e.target.value)}
                                displayEmpty
                                style={{ width: '150px',height:"40px" }}
                                sx={{
                                  '& .MuiSelect-icon': { display: 'none' } // Hides the dropdown icon
                                }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Present">Present</MenuItem>
                                <MenuItem value="Absent">Absent</MenuItem>
                                <MenuItem value="Leave">Leave</MenuItem>
                              </Select>
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '0px', backgroundColor: getFeeColor(feeValue) }}>
                              <Select
                                value={feeValue}
                                onChange={(e) => handleChange(member.id, formattedDate, 'fee', e.target.value)}
                                displayEmpty
                                style={{ width: '150px',height:"40px" }}
                                sx={{
                                  '& .MuiSelect-icon': { display: 'none' } // Hides the dropdown icon
                                }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Late Paid">Late Paid</MenuItem>
                              </Select>
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '0px', backgroundColor: '#fff' }}>
                              {attendanceValue === 'Absent' && (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={fineValue}
                                      onChange={(e) => handleCheckboxChange(member.id, formattedDate, e.target.checked)}
                                    />
                                  }
                                  label="Paid"
                                />
                              )}
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td style={{ border: '1px solid #ddd', padding: '4px' }}>{totals.totalDaysPresent}</td>
                      <td style={{ border: '1px solid #ddd', padding: '4px' }}>{totals.totalFees}</td>
                     

                    </tr>
                    
                  </>
                  );
                  
                })}
                <tr>
                  <td style={{position: 'sticky', left: 0, zIndex: 1, border: '1px solid #ddd', padding: '0px', width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: '#f5f5f5' }}>Summary of Month</td>
                  {firstSundays.map((date, index) => (
                    <React.Fragment key={index}>
                      <td colSpan={3} style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f5f5f5' }}>
                        <Container sx={{ ml: '0px' }}>
                          <Box>Total Fee Collection: {summary.totalFeeCollection}</Box>
                          <Box>Total Absent: {summary.totalAbsent}</Box>
                          <Box>Total Present: {summary.totalPresent}</Box>
                          <Box>Total Late Fee Collection: {summary.totalLateFeeCollection}</Box>
                          <Box>Total Absent Fee Collection: {summary.totalAbsentFeeCollection}</Box>
                        </Container>
                      </td>
                    </React.Fragment>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default AttendanceManagement;
