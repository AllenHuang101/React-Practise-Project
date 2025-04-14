import { Modal } from 'antd';

interface FormProps {
    visible: boolean;
    hideModal: () => void;
    title: string;
}

function UseForm(props: FormProps) {
    const { visible, hideModal, title } = props;

    return (
        <Modal
            title={title}
            open={visible}
            onCancel={hideModal}>
            <div>我是彈窗的內容</div>
        </Modal>
    );
}

export default UseForm;