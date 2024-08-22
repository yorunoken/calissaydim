export enum ExamCategory {
    SAY = "say",
    EA = "ea",
    DIL = "dil",
    SOZ = "soz",
    TYT = "tyt",
}

export interface CustomResult {
    universityName: string;
    className: string;
    classFaculty: string;
    tbs2024: string;
}

export interface Tyt {
    yop_code?: string;
    university_name?: string;
    faculty?: string;
    class_name?: string;
    education_duration?: string;
    city?: string;
    university_style?: string;
    scholarship_rate?: string;
    education_style?: string;
    student_quota_2024?: string;
    student_quota_2023?: string;
    student_status_2024?: string;
    student_status_2023?: string;
    base_score_2024?: string;
    base_score_2023?: string;
    tbs_2024?: string;
    tbs_2023?: string;
}

export interface Ayt {
    yop_code?: string;
    university_name?: string;
    faculty?: string;
    class_name?: string;
    education_style?: string;
    education_duration?: string;
    city?: string;
    university_style?: string;
    scholarship_rate?: string;
    student_quota_2024?: string;
    student_quota_2023?: string;
    student_quota_2022?: string;
    student_quota_2021?: string;
    fullness_status?: string;
    enrolled_2024?: string;
    enrolled_2023?: string;
    enrolled_2022?: string;
    enrolled_2021?: string;
    tbs_2024?: string;
    tbs_2023?: string;
    tbs_2022?: string;
    tbs_2021?: string;
    base_score_2024?: string;
    base_score_2023?: string;
    base_score_2022?: string;
    base_score_2021?: string;
}
