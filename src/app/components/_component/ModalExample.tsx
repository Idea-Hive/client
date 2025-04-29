"use client";

import Modal from "@/components/Modal";
import { useState } from "react";
import Content from "./Content";

const ModalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Content
            description="Modal Component 입니다."
            props={[
                { name: "isOpen", type: "boolean", description: "Modal 열림 여부" },
                { name: "onClose", type: "function", description: "Modal 닫기 버튼 클릭 시 실행될 함수" },
                { name: "title", type: "string", description: "Modal 제목" },
                { name: "onConfirm", type: "function", description: "Modal 확인 버튼 클릭 시 실행될 함수" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <>
                            <button onClick={() => setIsModalOpen(true)}>모달 열기</button>

                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                title="테스크메이트"
                                onConfirm={() => {
                                    setIsModalOpen(false);
                                }}
                            >
                                이제 프로젝트를 탐색하고 팀원을 모집할 수 있어요
                                <br />
                                지금 바로 원하는 프로젝트를 찾아보세요
                            </Modal>
                        </>
                    ),
                },
            ]}
        />
    );
};

export default ModalExample;
