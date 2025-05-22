import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { RefObject, useEffect } from "react";
import "./ToastEditorStyle.css";

type Props = {
    editorRef: RefObject<Editor>;
    label?: string;
    onChange: (value: string) => void;
    isRequired?: boolean;
    placeholder?: string;
    isErr?: boolean;
    errMsg?: string;
};

export default function ToastEditorWrapper({ editorRef, label, placeholder, onChange, isRequired = false, isErr = false, errMsg = "" }: Props) {
    useEffect(() => {
        if (isErr) {
            document.documentElement.querySelector(".toastui-editor-defaultUI")?.classList.add("border-taskmateRed");
        } else {
            document.documentElement.querySelector(".toastui-editor-defaultUI")?.classList.remove("border-taskmateRed");
        }
    }, [isErr]);

    return (
        <div>
            {label !== "" && (
                <div className="mb-2 text-sm font-medium text-n800">
                    {label}
                    {isRequired && <span className="text-taskmateRed">*</span>}
                </div>
            )}
            <Editor
                ref={editorRef}
                height="221px"
                initialEditType="wysiwyg"
                placeholder={placeholder}
                hideModeSwitch={true}
                toolbarItems={[
                    ["heading", "bold", "italic", "strike"],
                    ["hr", "quote"],
                    ["ul", "ol"],
                    ["table", "link"],
                ]}
                initialValue=" "
                onChange={() => {
                    const instance = editorRef.current?.getInstance();
                    const markdown = instance?.getMarkdown();
                    onChange(markdown);
                }}
            />
            {isErr && <div className="text-red text-xs mt-2">{errMsg}</div>}
        </div>
    );
}
