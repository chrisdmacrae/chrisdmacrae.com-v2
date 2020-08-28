import React from "react";
import { Container, Row, Col, SafeAnchor } from "react-bootstrap";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";
import { InlineForm, InlineGroup, InlineText } from "react-tinacms-inline";
import { Form, useCMS, usePlugin } from "tinacms";
import { EditLink } from "../../../cms/components/EditLink";
import { useFooterForm } from "./footer.form";

export interface FooterProps {
  file: GitFile<any>,
  repoPath: string;
}

export function Footer({ file, repoPath }: FooterProps) {
  const cms = useCMS();
  const isEditing = cms.enabled;
  const [data, form] = useFooterForm(file);

  usePlugin(form);

  return (
    <Container>
      <Row>
        <Col className="pt-2 pb-2">
          <SafeAnchor href="#" className="text-gray mr-3">
            <EditLink>
              {isEditing ? data.editing.enabled.text : data.editing.disabled.text }
            </EditLink>
          </SafeAnchor>
          <SafeAnchor href={isEditing ? "#" : repoPath} className="text-gray">
            { data.github.text }
          </SafeAnchor>
        </Col>
      </Row>
    </Container>
  );
}