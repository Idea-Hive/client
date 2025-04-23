"use client";

import Button from "@/components/Button";
import { useState } from "react";
import OptionalInformations from "./_component/OptionalInformations";
import RequiredInformations from "./_component/RequiredInformations";
import { skillCategories } from "./_data/skills";
import { RequiredValues } from "./_types/type";

export default function CreateProject() {
    const [requiredValues, setRequiredValues] = useState<RequiredValues>({
        name: "",
        description: "",
        idea: "",
        peopleNumber: 0,
        startDate: "",
        endDate: "",
        link: "",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof skillCategories>("frontend");

    const onTemporarySave = () => {
        console.log("임시저장");
        console.log(requiredValues);
        console.log(selectedSkills);
    };
    const onSave = () => {
        console.log("등록");
        console.log(requiredValues);
        console.log(selectedSkills);
    };

    return (
        <div className="w-[720px] mx-auto">
            <RequiredInformations requiredValues={requiredValues} setRequiredValues={setRequiredValues} />
            <OptionalInformations
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="flex justify-center gap-3 mt-6">
                <Button label="임시저장" type="button" onClick={onTemporarySave}></Button>
                <Button label="등록" type="button" onClick={onSave}></Button>
            </div>
        </div>
    );
}
