import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";

type Props = {
    content: string;
};

export default function ToastViewerWrapper({ content }: Props) {
    return (
        <div className="[&_.toastui-editor-contents]:font-pretendard [&_.toastui-editor-contents]:text-base">
            <Viewer initialValue={content} />
        </div>
    );
}
