import React from "react"
import { Box, Divider, Heading, Layout, LongFormText, Stack, Text, useBreakpoints } from "cdm-ui";
import { BasicLayout } from "../../layouts";
import { ProfileModel, QualificationModel, SkillModel } from "cdm-content/qualifications";
import styles from './Qualifications.module.css';
import { profile } from "console";

export type QualificationsPageProps = {
  profile: ProfileModel;
  skills: SkillModel[];
  qualifications: QualificationModel[]
}

export const QualificationsPage: React.VFC<QualificationsPageProps> = ({ qualifications, profile, skills }) => {
  const history = qualifications
    .filter(q => q.type === 'consulting' || q.type === 'employment');

  return (
    <BasicLayout>
      <Layout.Item>
        <Box padding="sm">
          <Heading as="h1" size="headline">My Qualifications & History</Heading>
          <Divider />
          <Heading as="h2" size="title">{profile.headline}</Heading>
          <Heading as="h3" muted>{profile.strapline}</Heading>
          <Divider />
          <Skills skills={skills} />
          <Divider />
          <ProfessionalHistory history={history} />
        </Box>
      </Layout.Item>
    </BasicLayout>
  )
}

const Skills = ({ skills }: { skills: SkillModel[] }) => {
  const breakpoints = useBreakpoints();

  return (
    <Stack gap="sm" direction="vertical">
      <Layout gutter="sm" fill>
        <Layout.Item>
          <Heading as="h2" size="title">Skills and Interests</Heading>
        </Layout.Item>
        {skills.map(skill => (
          <Layout.Item oneThird={breakpoints.md}>
            <Heading as="h4">{skill.title}</Heading>
            <Text as="div" muted>{skill.description}</Text>
          </Layout.Item>
        ))}
      </Layout>
    </Stack>
  )
}

const ProfessionalHistory = ({ history }: { history: QualificationModel[] }) => {
  const getTime = (item: QualificationModel) => {
    if (item.start && item.end) return `${new Date(item.start).getFullYear()}-${new Date(item.end).getFullYear()},`;
    if (item.start) return `${new Date(item.start).getFullYear()},` 
    if (item.end) return `${new Date(item.end).getFullYear()},`
    return ''; 
  }
  const getType = (item: QualificationModel) => {
    if (item.type === 'employment') return "Full-time";
    if (item.type === 'consulting') return "Consulting";
  }

  return (
    <Stack gap="sm" direction="vertical">
      <Heading as="h2" size="title">Professional History</Heading>
      <Stack gap="md" direction="vertical">
        {history.map(item => (
          <Stack.Item>
            <Heading as="h3">{item.title}</Heading>
            <Heading as="h4" muted>{item.roles?.join(', ')}</Heading>
            <Text as="div" muted>{getTime(item)} {getType(item)}</Text>
            <LongFormText markdown={item.rawContent} />
          </Stack.Item>     
        ))}
      </Stack>
    </Stack>
  )
}