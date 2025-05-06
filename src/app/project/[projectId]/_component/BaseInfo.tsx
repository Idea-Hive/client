const content = `💡테스크메이트(Taskmate) 플랫폼에 등록된 미완성 프로젝트를 팀을 꾸려 실제 서비스까지 완성하는 것!💡<br/>
"실행력 있는 사이드 프로젝트 문화를 만들자"는 취지로 시작되었어요.<br/><br/>

🗓️주 1~2회 온라인 미팅 / Notion, Discord 등 협업툴 사용할 생각입니다(협의 가능)<br/><br/>

프로젝트를 함께 기획하고, 개발/디자인/런칭까지 경험하며 실무 감각과 협업 스킬을 키우는 데 목적을 두고 있습니다.<br/>
사용하고 싶은 기술, 실험하고 싶은 툴이 있다면 환영이에요!<br/><br/>

이런 분과 함께하고 싶어요👥<br/>
사이드 프로젝트를 진심으로 완성해보고 싶은 분<br/>
온라인 협업에 익숙하고, 의사소통이 원활한 분<br/>
새로운 도전을 즐기고, 팀워크에 열린 마음을 가진 분<br/><br/>

참고 사항 : 프로젝트의 성격상 결과물을 포트폴리오에 사용 가능하며, 일정 수준 이상의 퀄리티를 목표로 합니다.<br/>
부담 없이 함께, 하지만 진심으로 임할 분을 기다려요!<br/><br/>

지원 방법 : 간단한 자기소개와 함께 아래 링크또는 지원하기로 지원해주세요 :)<br/>
👉 [지원 오픈채팅 or 구글폼 링크]
`;

export default function BaseInfo() {
    return (
        <div>
            <div className="text-h3 text-n900 mb-4">프로젝트 소개</div>
            <div className="text-base leading-[26px] font-normal text-n900" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
