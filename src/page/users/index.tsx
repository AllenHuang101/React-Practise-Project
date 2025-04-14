import { Button, Card, Col, Input, Pagination, PaginationProps, Row, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { getUserList } from "../../api/userList";
import type { DataType } from "./interface";

interface searchType {
  companyName: string;
  contact: string;
  phone: string

}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "No.",
    key: "index",
    render(value, record, index) {
      return index + 1;
    }
  },
  {
    title: '客戶名稱',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '經營狀態',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '聯繫電話',
    dataIndex: 'tel',
    key: 'tel',
  },
  {
    title: '所屬行業',
    dataIndex: 'business',
    key: 'business',
  },
  {
    title: '郵箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '統一信用代碼',
    dataIndex: 'creditCode',
    key: 'creditCode',
  },
  {
    title: '工商註冊號',
    dataIndex: 'industryNum',
    key: 'industryNum',
  },
  {
    title: '組織機構代碼',
    dataIndex: 'organizationCode',
    key: 'organizationCode',
  },
  {
    title: '法人名',
    dataIndex: 'legalPerson',
    key: 'legalPerson',
  },
  {
    title: '操作',
    key: 'operate',
    render(value, record, index) {
      return <>
        <Button type="primary" size="small">編輯</Button>
        <Button type="primary" danger className="ml" size="small">編輯</Button>
      </>
    }
  },
];

function Users() {
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [formData, setFormData] = useState<searchType>({
    companyName: "",
    contact: "",
    phone: ""
  })

  useEffect(() => {
    loadData();
  }, [page, pageSize]);

  const loadData = async () => {
    setLoading(true);
    const { data: { list, total } } = await getUserList({ ...formData, page, pageSize });
    setLoading(false);
    setDataList(list);
    setTotal(total);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: any) => {
    // console.log(selectedRowKeys, selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    // console.log(page, pageSize);
    setPage(page);
    setPageSize(pageSize);
    // loadData();
  }

  return <div className="users">
    <Card className="search">
      <Row gutter={16}>
        <Col span={7}>
          <p>企业名称：</p>
          <Input name="companyName" value={formData.companyName} onChange={handleChange} />
        </Col>
        <Col span={7}>
          <p>联系人：</p>
          <Input name="contact" value={formData.contact} onChange={handleChange} />
        </Col>
        <Col span={7}>
          <p>联系电话</p>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </Col>
        <Col span={3}>
          <Button type="primary">查詢</Button>
          <Button className="ml">重置</Button>
        </Col>
      </Row>
    </Card>
    <Card className="mt tr">
      <Button type="primary" >新增企业</Button>
      <Button danger type="primary" className="ml">批量删除</Button>
    </Card>

    <Card className="mt">
      <Table
        dataSource={dataList}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
        rowSelection={rowSelection}
        pagination={false}
      />

      <Pagination
        className="fr mt"
        total={total}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 條`}
        onChange={onChange}
      />
    </Card>
  </div>;
}

export default Users;
