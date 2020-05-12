import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import storageUtils from "../../utils/storageUtils";
import { BASE } from '../../utils/constants';

const token = storageUtils.getToken();

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    const html = this.props.detail;
    // if the detail is true, create a new editor based on the detail
    if (html) {
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    } else {
        this.state = {
            editorState: EditorState.createEmpty() // create a empty editor container
        }
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  getContentDetail = () => {
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${BASE}/image-upload`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        const data = new FormData();
        data.append('profileImage', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url;
          resolve({data: {link: url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        editorStyle={{
          border: "1px solid black",
          minHeight: 200,
          paddingLeft: 10
        }}
        onEditorStateChange={this.onEditorStateChange}
        toolbarHidden={this.props.showTextEditorToolbar === false}
        toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
      />
    );
  }
}

RichTextEditor.propTypes = {
  detail: PropTypes.string,
  showTextEditorToolbar: PropTypes.bool
};

export default RichTextEditor;
