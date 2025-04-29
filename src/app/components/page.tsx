"use client";

import Tab from "@/components/Tab";
import ButtonExample from "./_component/ButtonExample";
import CheckboxExample from "./_component/CheckboxExample";
import InputExample from "./_component/InputExample";
import ModalExample from "./_component/ModalExample";
import PaginationExample from "./_component/PaginationExample";
import RadioExample from "./_component/RadioExample";
import SelectboxExample from "./_component/SelectboxExample";
import SpinnerExample from "./_component/SpinnerExample";
import TabExample from "./_component/TabExample";

export default function Components() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">공통 컴포넌트 목록</h1>

            <Tab
                items={[
                    { value: "button", label: "Button", children: <ButtonExample /> },
                    { value: "checkbox", label: "Checkbox", children: <CheckboxExample /> },
                    { value: "radio", label: "Radio", children: <RadioExample /> },
                    { value: "tab", label: "Tab", children: <TabExample /> },
                    { value: "spinner", label: "Spinner", children: <SpinnerExample /> },
                    { value: "input", label: "Input", children: <InputExample /> },
                    { value: "selectbox", label: "Selectbox", children: <SelectboxExample /> },
                    { value: "pagination", label: "Pagination", children: <PaginationExample /> },
                    { value: "modal", label: "Modal", children: <ModalExample /> },
                ]}
                defaultTab="button"
            />
        </div>
    );
}
