export default function Tag({ tag }: { tag: string }) {
    return (
        <div className="w-[100px] h-[32px] rounded-lg border p-2 flex items-center justify-center">
            <h1>{tag}</h1>
        </div>
    );
}