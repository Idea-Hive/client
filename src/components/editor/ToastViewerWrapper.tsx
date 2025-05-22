import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

type Props = {
    content: string;
};

export default function ToastViewerWrapper({ content }: Props) {
    return <Viewer initialValue={content} />;
}
