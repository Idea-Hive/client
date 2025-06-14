import Dashboard from "../_component/rightSection/showRoom/Dashboard";
import Calendar from "../_component/rightSection/showRoom/Calendar";
import Plan from "../_component/rightSection/process/Plan";
import Design from "../_component/rightSection/process/Design";
import Develop from "../_component/rightSection/process/Develop";
import Release from "../_component/rightSection/process/Release";
import Complete from "../_component/rightSection/process/Complete";

export const ComponentMap: Record<string, React.FC> = {
    "대시보드": Dashboard,
    "캘린더": Calendar,
    
    "기획": Plan,
    "디자인": Design,
    "개발": Develop,
    "배포": Release,
    "완료": Complete
};