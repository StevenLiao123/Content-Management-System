import React from 'react';
import PropTypes from "prop-types";
import { Upload, Modal, message, Icon } from 'antd';
import { reqDeleteImage } from '../../api';
import { BASE, BASE_IMG_AWS_URL } from '../../utils/constants';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  constructor(props) {
    super(props);

    let fileList = [];

    const { images } = this.props;
    if(images && images.length > 0) {
      fileList = images.map((image, index) => ({
        uid: -index, // uniquq index for each image
        name: image,
        status: "done",
        url: BASE_IMG_AWS_URL + image
      }))
    }

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList
    }
  }

  getImages = () => {
    return this.state.fileList.map(file => file.name);
  };  

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    // console.log('handleChange()', file.status, fileList.length, file);
    if(file.status === "done") {
      const result = file.response;
      if(result.data.status === 1) {
        message.success("Upload image successed!");
        const {name, url} = result.data; 
        file = fileList[fileList.length-1];
        file.name = name;
        file.url = url;
      } else {
        message.error("Upload image failed");
      }
    } else if(file.status === "removed") {
      const result = await reqDeleteImage(file.name);
      if(result.data.status === 1) {
        message.success(result.data.message);
      } else {
        message.error(result.data.message);
      }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { showPictureWallModal } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div>Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={`${BASE}/product/profile-img-upload`}
          accept="image/*,.pdf"
          name="profileImage"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          disabled={!showPictureWallModal}
        >
          {fileList.length >= 3 || !showPictureWallModal ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

PicturesWall.propTypes = {
  images: PropTypes.array,
  showPictureWallModal: PropTypes.bool,
};

export default PicturesWall;
