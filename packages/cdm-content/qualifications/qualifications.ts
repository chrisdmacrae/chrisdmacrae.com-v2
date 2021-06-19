import { BaseModel, getAllContent, getContentBySlug } from "cdm-content/content";
import { join } from "path";

export type QualificationModel = BaseModel & {
  type: 'employment'| 'case-study' | 'consulting'
  title: string
  start?: string
  end?: string
  roles: string[]
}

export type SkillModel = BaseModel & {
  title: string;
  description: string;
}

export type ProfileModel = BaseModel & {
  headline: string;
  strapline: string;
}

export const qualificationsDirectory = join(process.cwd(), 'packages/cdm-content/qualifications')
export const getAllSkills = async () => {
  const skills = await getContentBySlug('skills', qualificationsDirectory, '.json') as unknown as SkillModel[];

  return Object.values(skills)
}
export const getProfile = () => getContentBySlug('profile', qualificationsDirectory, '.json') as unknown as ProfileModel;
export const getAllQualifications = async () => {
  const qualifications = await getAllContent<QualificationModel>(qualificationsDirectory, ['.md'])
  
  return qualifications
    .sort((a, b) => !b.end || b.end > a.end || b.start > a.start ? 1: -1)
    .map(q => {
      if (q.start) q.start = new Date(q.start).toLocaleDateString();
      if (q.end) q.end = new Date(q.end).toLocaleDateString();

      return q;
    })
}