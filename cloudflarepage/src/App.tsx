import React, { useEffect, useState } from 'react';
import './App.css';
import Table  from 'antd/es/table';
import axios  from 'axios';
import { ColumnsType } from "antd/es/table";

interface PriceType {
  [index: number]: string
}

interface Coin {
  name: string;
  value: number;
  key: string;
}

const map: PriceType = {
  1027: 'ETH',
  1839: 'UTD'
}

const columns: ColumnsType<Coin> = [
  {
    title: '币种',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'value'
  }
]

function App() {
  const [prices , setPrices] = useState<Coin[]>([])

  useEffect(() => {
    fetchPrices()
  }, [])


  async function fetchPrices() {
    const result = await axios('https://coin-worker.gaoying.workers.dev/getEth')
    console.log(result);
    if (result && result.status === 200) {
      const data: {[key: number]: number} = result.data
      setPrices([
        {
          'name': 'ETH',
          'value': data[1027],
          key: '1'
        },
        {
          'name': 'UTD',
          'value': data[1839],
          key: '2'
        }
      ])
    }
  }

  return (
    <div className="App">
      <Table<Coin> columns={columns} dataSource={prices} pagination={false} size="large"/>
    </div>
     
  );
}

export default App;
