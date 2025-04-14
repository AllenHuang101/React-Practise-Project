import { Button, Card, Col, Input, message, Pagination, PaginationProps, Popconfirm, Row, Table, TableProps, Tag } from "antd";
import { useEffect, useMemo, useState } from "react";
import { batchDeleteUser, deleteUser, getUserList } from "../../api/userList";
import type { DataType } from "./interface";
import UseForm from "./userForm";

interface searchType {
  companyName: string;
  contact: string;
  phone: string

}

function Users() {
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [formData, setFormData] = useState<searchType>({
    companyName: "",
    contact: "",
    phone: ""
  })

  const disabled = useMemo(() => {
    return selectedRowKeys.length ? false : true
  }, [selectedRowKeys]);

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

  const reset = () => {
    setSelectedRowKeys([]);
    setFormData({
      companyName: "",
      contact: "",
      phone: ""
    })
    setPage(1);
    setPageSize(10);
    loadData();
  };

  const confirm = async function (id: string) {
    const { data } = await deleteUser(id);
    message.success(data);
    loadData();
  }

  const edit = (record: DataType) => {
    setIsModalOpen(true);
    setTitle("編輯企業");

  };

  const add = () => {
    setIsModalOpen(true);
    setTitle("新增企業");
  }

  const hideModal = () => {
    setIsModalOpen(false);
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
      render(value) {
        if (value == 1) {
          return <Tag color="green">營業中</Tag>
        } else if (value == 2) {
          return <Tag color="#f50">暫停營業</Tag>
        } else if (value == 3) {
          return <Tag color="red">已關閉</Tag>
        }
      }
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
          <Button type="primary" size="small" onClick={() => edit(record)}>編輯</Button>
          <Popconfirm title="刪除確認"
            description="確定要刪除嗎?"
            okText="確定"
            cancelText="取消"
            onConfirm={() => confirm(record.id)}>
            <Button type="primary" danger className="ml" size="small">刪除</Button>
          </Popconfirm>
        </>
      }
    },
  ];

  const batchDelete = async () => {
    const { data } = await batchDeleteUser(selectedRowKeys)
    message.success(data);
    loadData();
  }

  return <div className="users">
    <UseForm visible={isModalOpen} hideModal={hideModal} title={title} />
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
          <Button type="primary" onClick={loadData}>查詢</Button>
          <Button className="ml" onClick={reset}>重置</Button>
        </Col>
      </Row>
    </Card>
    <Card className="mt tr">
      <Button type="primary" onClick={add}>新增企业</Button>
      <Button danger type="primary" className="ml" disabled={disabled} onClick={batchDelete}>批量删除</Button>
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
        current={page}
        pageSize={pageSize}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `共 ${total} 條`}
        onChange={onChange}
      />
    </Card>
  </div>;
}

export default Users;
