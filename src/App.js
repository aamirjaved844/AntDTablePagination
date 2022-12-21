import "./App.css";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPassengers, setTotalPassengers] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords(1, 10);
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trips",
      dataIndex: "trips",
      key: "trips",
    },
  ];

  const fetchRecords = (page, pageSize) => {
    setLoading(true);
    axios
      .get(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`)
      .then((res) => {
        setDataSource(res.data.data);
        setTotalPassengers(res.data.totalPassengers);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: totalPassengers,
          onChange: (page, pageSize) => {
            fetchRecords(page, pageSize);
          },
        }}
      ></Table>
    </div>
  );
}
export default App;
