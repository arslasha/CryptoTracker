import { Spin, Table, Typography } from "antd";
import { useState } from "react";
import type { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { CryptoDataType } from "./types.ts";
import { fetchData, transformData } from "./functions.ts";
import { Button } from "antd";
import styles from "./Table.module.css";

const columns: TableColumnsType<CryptoDataType> = [
  {
    title: "№",
    dataIndex: "key",
    key: "key",
    sorter: {
      compare: (a, b) => a.key - b.key,
      multiple: 5,
    }
  },
  {
    title: "Логотип",
    dataIndex: "logo",
    key: "logo",
    render: (logo: string) => (
      <img src={logo} alt="Logo" style={{ width: "20px" }} />
    ),
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Тикер",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    sorter: {
      compare: (a, b) => {
        const numA = parseFloat(a.price.replace('$', ''));
        const numB = parseFloat(b.price.replace('$', ''));
        return numA - numB;
      },
      multiple: 4,
    }
  },
  {
    title: "Изменение (24ч)",
    dataIndex: "priceChange",
    key: "priceChange",
    sorter: {
      compare: (a, b) => {
        const numA = parseFloat(a.priceChange.replace('%', ''));
        const numB = parseFloat(b.priceChange.replace('%', ''));
        return numA - numB;
      },
      multiple: 3,
    }
  },
  {
    title: "Капитализация",
    dataIndex: "marketCap",
    key: "marketCap",
    sorter: {
      compare: (a, b) => {
        const numA = parseFloat(a.marketCap.replace('$', ''));
        const numB = parseFloat(b.marketCap.replace('$', ''));
        return numA - numB;
      },
      multiple: 2,
    }
  },
  {
    title: "Объем торгов (24ч)",
    dataIndex: "volume",
    key: "volume",
    sorter: {
      compare: (a, b) => {
        const numA = parseFloat(a.volume.replace('$', ''));
        const numB = parseFloat(b.volume.replace('$', ''));
        return numA - numB;
      },
      multiple: 1,
    }
  },
];

export default function CurrencyTable() {
  const [page, setPage] = useState(1);
  const [sort] = useState("market_cap_desc");

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["currencies", page, sort],
    queryFn: () => fetchData(page, sort),
  });

  if (isError) {
    return <div>Ошибка: {error.toString()}</div>;
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spin
          className={styles.loading}
          indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />}
        />
      ) : (
        <Table<CryptoDataType>
          className={styles.table}
          columns={columns}
          dataSource={transformData(data)}
          pagination={{
            current: page,
            pageSize: 10,
            showSizeChanger: false,
            hideOnSinglePage: true,
          }}
          size="small"
          tableLayout="fixed"
        />
      )}

      <div className={styles.pagination}>
        <Button size="large" onClick={() => page > 1 && setPage(page - 1)}>
          -
        </Button>
        <Typography>{page}</Typography>
        <Button size="large" onClick={() => setPage(page + 1)}>
          +
        </Button>
      </div>
    </div>
  );
}
