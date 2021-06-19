import { getAllQualifications, getAllSkills, getProfile } from "cdm-content/qualifications";
import { GetStaticProps } from "next";
import { QualificationsPage, QualificationsPageProps } from "../views";

export const getStaticProps: GetStaticProps<QualificationsPageProps> = async () => {
  const props: any = {}
  const profile = await getProfile();
  const skills = await getAllSkills();
  const qualifications = await getAllQualifications();

  props.profile = profile
  props.skills = skills
  props.qualifications = qualifications

  return {
    props
  }
}

export default QualificationsPage;