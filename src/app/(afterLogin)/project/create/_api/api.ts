import axios from "axios";

export const onSaveApi = async (body: any) => {
    return await axios.post("http://localhost:8080/api/project/create", body, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYnN3cGd1cjJAbmF2ZXIuY29tIiwiaXNzIjoiVGFza21hdGUiLCJpYXQiOjE3NDY1MzIzNDUsImV4cCI6MTc0NjU2MjM0NSwidHlwZSI6ImFjY2VzcyJ9.PQ3ikZhJrIK5GPiKk0u0h43jbYItc0j5AwcjMcyNY44`,
        },
    });
};
