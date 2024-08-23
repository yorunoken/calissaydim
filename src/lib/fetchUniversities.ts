import { ExamCategory, CustomResult } from "@/types/exam";

async function getExamData(
    examType: ExamCategory,
    query: string,
): Promise<Array<CustomResult>> {
    let res;
    switch (examType) {
        case ExamCategory.TYT:
            res = await fetch(`/api/proxy/${examType}?query=${query}`);
            break;
        default:
            res = await fetch(`/api/proxy/ayt/${examType}?query=${query}`);
            break;
    }

    if (!res.ok) {
        console.log("There was an error: ", res);
        return [];
    }

    const resultData = await res.json();

    return resultData.map((result: any) => ({
        universityName: result.university_name ?? "",
        classFaculty: result.faculty ?? "",
        className: result.class_name ?? "",
        tbs2024: (Number(result.tbs_2024) || "-").toLocaleString(),
    }));
}

export async function fetchUniversities(
    ranking: number,
): Promise<Record<ExamCategory, Array<CustomResult>>> {
    const query = `WHERE CAST(tbs_2024 AS INTEGER) >= ${ranking} ORDER BY CAST(tbs_2024 AS INTEGER) ASC LIMIT 5;`;
    const fallbackQuery = `WHERE base_score_2024 IS NULL ORDER BY RANDOM() LIMIT 5;`;

    const examTypes = [
        ExamCategory.SAY,
        ExamCategory.EA,
        ExamCategory.DIL,
        ExamCategory.SOZ,
        ExamCategory.TYT,
    ];

    const results = await Promise.all(
        examTypes.map(async (examType) => {
            let data = await getExamData(examType, query);
            if (data.length === 0) {
                data = await getExamData(examType, fallbackQuery);
            }
            return [examType, data];
        }),
    );

    return Object.fromEntries(results) as Record<
        ExamCategory,
        Array<CustomResult>
    >;
}
