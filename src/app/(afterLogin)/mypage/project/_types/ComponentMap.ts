import Calendar from "../_component/rightSection/manage/Calendar";
import Plan from "../_component/rightSection/process/Plan";
import Design from "../_component/rightSection/process/Design";
import Develop from "../_component/rightSection/process/Develop";
import Release from "../_component/rightSection/process/Release";
import Complete from "../_component/rightSection/process/Complete";
import Team from "../_component/rightSection/manage/Team";

export const ComponentMap: Record<string, React.FC> = {
    "캘린더": Calendar,
    "팀": Team,
    
    "기획": Plan,
    "디자인": Design,
    "개발": Develop,
    "배포": Release,
    "완료": Complete
};