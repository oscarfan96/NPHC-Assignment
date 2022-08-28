import { message, Modal } from "antd"
import 'antd/dist/antd.css';
import { useQueryClient } from "@tanstack/react-query";
import { InboxOutlined } from '@ant-design/icons';
import Upload, { UploadChangeParam, UploadFile } from "antd/lib/upload";

const TITLE = 'Upload employees CSV files';

const { Dragger } = Upload;
const UploadModal = (props: { isShow: boolean; closeModal: any }) => {
  const queryClient = useQueryClient();

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file;

    if (status === 'done') {
      queryClient.invalidateQueries(['employees']);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Modal visible={props.isShow} title={TITLE} onCancel={props.closeModal} footer={null} width={1000}>
      <Dragger name='file' multiple={true} method="post" action='http://localhost:3001/employees/upload' onChange={onUploadChange}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload.
        </p>
      </Dragger>
    </Modal >
  )
}

export default UploadModal;