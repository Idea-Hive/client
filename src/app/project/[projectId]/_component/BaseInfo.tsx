export default function BaseInfo({ description }: { description: string }) {
    return (
        <div>
            <div className="text-h3 text-n900 mb-4">프로젝트 소개</div>
            <div className="text-base leading-[26px] font-normal text-n900" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    );
}
