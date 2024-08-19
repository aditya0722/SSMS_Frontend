import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MenuItem, Select, Snackbar, Box, Container, Alert, Checkbox, FormControlLabel } from '@mui/material';
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/api/login/members");
        setMembers(data.map(member => ({ id: member._id, name: member.name })));
      } catch (error) {
        console.error("Error fetching members data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/api/getalldata");
        const { attendance, fees } = data;

        const updatedData = {};

        attendance.forEach(item => {
          const memberId = item.memberId;
          const date = new Date(item.date).toISOString().split('T')[0];

          if (!updatedData[memberId]) {
            updatedData[memberId] = {};
          }
          updatedData[memberId][date] = {
            status: item.status,
            finePaid: item.finePaid || false
          };
        });

        fees.forEach(item => {
          const memberId = item.memberId;
          const date = new Date(item.date).toISOString().split('T')[0];

          if (!updatedData[memberId]) {
            updatedData[memberId] = {};
          }
          if (!updatedData[memberId][date]) {
            updatedData[memberId][date] = {};
          }
          updatedData[memberId][date].feePaid = item.status;
          updatedData[memberId][date].amount = item.amount || 0;
          updatedData[memberId][date].fine = item.fine || false
        });

        setData(updatedData);
        console.log("updatedata", data)

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const saveAttendanceData = async (memberId, date, fine, type) => {
    console.log("value ", memberId, date, fine, type)

    try {
      if (type === "fine") {
        await axios.post("http://localhost:3000/api/UpdateAttandanceFine", {
          memberId, date
        })
      } else {
        await axios.post("http://localhost:3000/api/updateMothlyFee", {
          memberId, date
        })
      }

    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const parseAndFormatDate = useCallback(dateStr => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }, []);

  const handleChange = async (memberId, date, type, value) => {
    const newDate = parseAndFormatDate(date);
    console.log("type", memberId, date, type, value)

    setData(prevData => ({
      ...prevData,
      [memberId]: {
        ...prevData[memberId],
        [newDate]: {
          ...prevData[memberId]?.[newDate],
          [type]: value,
        },
      },
    }));

    try {
      setLoading(true);
       if (type === "feePaid") {
        await axios.post("http://localhost:3000/api/addmonthlyfee", {
          memberId,
          newDate,
          status: value,
        });
      }
      else {
        await axios.post("http://localhost:3000/api/addAttandance", {
          memberId,
          newDate,
          status: value,
        });
      }
      setSnackbar({ open: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully`, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Error saving ${type}`, severity: 'error' });
      console.error(`Error saving ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (memberId, date, checked, type) => {

    // const formattedDate = formatDate(date);
    const finaldate = parseAndFormatDate(date)

    setData(prevData => {
      const memberData = prevData[memberId] || {};
      const dateData = memberData[finaldate] || {};
      console.log("value datedata", dateData)

      let newFine = dateData.fine || 0;
      let newFinePaid = dateData.finePaid || false;
      let newFeePaid = dateData.feePaid || '';

      if (type === 'fine') {
        setData(prevData => ({
          ...prevData,
          [memberId]: {
            ...prevData[memberId],
            [date]: {
              ...dateData.finePaid = true,
            },
          },
        }));
      } else if (type === 'lateFee') {
        setData(prevData => ({
          ...prevData,
          [memberId]: {
            ...prevData[memberId],
            [date]: {
              ...dateData.fine = 1,
            },
          },
        }));
      }

    });

    saveAttendanceData(memberId, finaldate, checked, type);
  };

  const formatDate = useCallback(date => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }, []);

  const getFirstSundays = useMemo(() => {
    const firstSundays = [];
    for (let month = 0; month < 12; month++) {
      const date = new Date(new Date().getFullYear(), month, 1);
      const day = date.getDay();
      const firstSunday = day === 0 ? date : new Date(new Date().getFullYear(), month, 1 + (7 - day));
      firstSundays.push(firstSunday);
    }
    return firstSundays;
  }, []);

  const getCellColor = useCallback(value => {
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
  }, []);

  const getFeeColor = useCallback(value => {
    switch (value) {
      case 'Paid':
        return '#d4edda'; // light green
      case 'Late Paid':
        return '#fff3cd'; // light yellow
      default:
        return 'transparent';
    }
  }, []);

  const calculateTotals = useCallback(memberId => {
    const memberData = data[memberId] || {};
    let totalDaysPresent = 0;
    let totalFees = 0;

    Object.values(memberData).forEach(record => {
      if (record.status === 'Present') totalDaysPresent += 1;
      if (record.fine) totalFees += record.fine;
      if (record.feePaid === 'Paid' || record.feePaid === 'Late Paid') totalFees += record.amount;
    });

    return { totalDaysPresent, totalFees };
  }, [data]);

  const calculateSummary = useCallback(selectedDate => {
    const summary = {
      totalPresent: 0,
      totalAbsent: 0,
      totalFees: 0,
      totalLateFees: 0,
      totalAbsentFees: 0,
    };
    const formattedDate = formatDate(selectedDate);
    const finaldate = parseAndFormatDate(formattedDate)
    console.log("selectedate", finaldate)
    members.forEach(member => {



      const memberData = data[member.id] || {};
      const record = memberData[finaldate] || {};
      console.log("record", record)
      if (record.status === 'Present') summary.totalPresent += 1;
      if (record.status === 'Absent') {
        summary.totalAbsent += 1;
        if (record.finePaid) summary.totalAbsentFees += 100;
      }
      if (record.feePaid === 'Paid') {
        summary.totalFees += 50;
      }
      if (record.fine) {
        summary.totalLateFees += 100;
      }
      if (record.feePaid === 'Late Paid') summary.totalFees += 50;
    });

    return summary;
  }, [data, members, formatDate]);

  const dates = getFirstSundays;
  return (
    <>
      <ProgressBar loading={loading} />
      <Spinner loading={loading} />
      <AdminNav toggleSidebar={toggleSidebar} />
      <div className="flex min-h-screen">
      <div className={`transition-transform duration-300  ${isSidebarCollapsed ? 'hidden -translate-x-full lg:translate-x-0 md:hidden' : 'translate-x-0 block'}`}>
          <SidebarMenu collapsed={isSidebarCollapsed} />
        </div>
        <Container style={{ flex: 1, padding: '10px', overflowX: 'auto' }}>
          <div>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ marginBottom: '20px', width: '200px' }}
              sx={{
                '& .MuiSelect-icon': { display: 'none' } // Hides the dropdown icon
              }}
            >
              {getFirstSundays.map((date, index) => (
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
                  <th style={{ position: 'sticky', left: 0, zIndex: 1, border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap'}}>
                    Member Name
                  </th>
                  {getFirstSundays.map((date, index) => (
                    <th key={index} colSpan={4} style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>
                      {formatDate(date)}
                      <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
                        <div style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>Attendance</div>
                        <div style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>Absent Fee</div>
                        <div style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>Monthly Fee</div>
                        <div style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap', width: "100%" }}>Late Fee</div>
                      </div>
                    </th>
                  ))}
                  <th style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5' }}>Total Days Present</th>
                  <th style={{ border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5' }}>Total Fees</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  const totals = calculateTotals(member.id);

                  return (
                    <tr key={member.id}>
                      <td style={{ position: 'sticky', left: 0, zIndex: 1, border: '1px solid #ddd', padding: '0px', width: '100px',height:"30px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', backgroundColor: '#f5f5f5' }}>
                        {member.name}
                      </td>

                      {getFirstSundays.map((date, index) => {

                        const formattedDate = formatDate(date);
                        const finaldate = parseAndFormatDate(formattedDate)
                        const cellData = data[member.id]?.[finaldate] || {};
                        const memberData = data[member.id];
                        const attendanceValue = cellData.status || '';
                        const feeValue = cellData.feePaid || '';
                        const fineValue = cellData.fine;
                        const finepaid = cellData.finePaid || false;
                        console.log("celldata", cellData)


                        return (
                          <React.Fragment key={index}>
                            <td style={{ width:'80px',height:"20px",border: '1px solid #ddd', backgroundColor: getCellColor(attendanceValue) }}>
                              <Select
                                value={attendanceValue}
                                onChange={(e) => handleChange(member.id, formattedDate, 'status', e.target.value)}
                                displayEmpty
                                style={{ width: '100px', height: "30px" }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Present">Present</MenuItem>
                                <MenuItem value="Absent">Absent</MenuItem>
                                <MenuItem value="Leave">Leave</MenuItem>
                              </Select>
                            </td>
                            <td style={{ border: '1px solid #ddd',width:"50px", padding: '0px', backgroundColor: getCellColor(attendanceValue) }}>
                              {attendanceValue === 'Absent' && (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={finepaid}
                                      onChange={(e) => handleCheckboxChange(member.id, formattedDate, e.target.checked, 'fine')}
                                    />
                                  }
                                  label="Paid"
                                />
                              )}
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '0px', backgroundColor: getFeeColor(feeValue) }}>
                              <Select
                                value={feeValue}
                                onChange={(e) => handleChange(member.id, formattedDate, 'feePaid', e.target.value)}
                                displayEmpty
                                style={{ width: '100px', height: "30px" }}
                              >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Late Paid">Late Paid</MenuItem>
                              </Select>
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '0px', backgroundColor: getFeeColor(feeValue) }}>
                              {feeValue === 'Late Paid' && (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={fineValue}
                                      onChange={(e) => handleCheckboxChange(member.id, formattedDate, e.target.checked, 'lateFee')}
                                    />
                                  }
                                  label="Paid"
                                />
                              )}
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td style={{ border: '1px solid #ddd', padding: '0px' }}>{totals.totalDaysPresent}</td>
                      <td style={{ border: '1px solid #ddd', padding: '0px' }}>{totals.totalFees}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td style={{ position: 'sticky', left: 0, zIndex: 1, border: '1px solid #ddd', padding: '2px', backgroundColor: '#f5f5f5', whiteSpace: 'nowrap' }}>Monthly Summary</td>
                  {getFirstSundays.map((date, index) => {
                    const summary = calculateSummary(date)
                    return (
                      <td colSpan={4} key={index} style={{ border: '1px solid #ddd', padding: '0px', whiteSpace: 'nowrap' }}>
                        <div>Total Present: {summary.totalPresent}</div>
                        <div>Total Absent: {summary.totalAbsent}</div>
                        <div>Total Fees: ₹{summary.totalFees}</div>
                        <div>Total Late Fees: ₹{summary.totalLateFees}</div>
                        <div>Total Absent Fees: ₹{summary.totalAbsentFees}</div>
                      </td>
                    );
                  })}
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
        </Container>
      </div>
    </>
  );
};

export default AttendanceManagement;
