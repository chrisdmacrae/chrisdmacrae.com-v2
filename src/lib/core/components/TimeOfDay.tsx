import React from "react";
import { useCMS } from "tinacms";
import { InlineText } from "react-tinacms-inline";

export interface TimeMessageProps {
  morning: React.ReactChild,
  afternoon: React.ReactChild,
  evening: React.ReactChild
}

export function TimeOfDay({ morning, afternoon, evening }: TimeMessageProps) {
  const time = new Date();
  const isMorning = time.getHours() < 12;
  const isAfternoon = !isMorning && time.getHours() < 15;
  const isEvening = !isAfternoon && !isMorning;

  switch (true) {
    case isMorning:
      return (<>{ morning }</>);
    case isAfternoon:
      return (<>{ afternoon }</>);
    case isEvening:
      return (<>{ evening }</>);
    default:
      return null;
  }
}

export interface EditableTimeMessageProps extends TimeMessageProps {
  name: string;
}

export function EditableTimeOfDay({name, morning, afternoon, evening}: EditableTimeMessageProps) {
  const cms = useCMS();
  const isEditing = cms.enabled;
  const editableMorning = isEditing ? <InlineText name={`${name}.morning`} /> : morning;
  const editableAfternoon = isEditing ? <InlineText name={`${name}.afternoon`} /> : afternoon;
  const editableEvening = isEditing ? <InlineText name={`${name}.evening`} /> : evening;

  return (
    <TimeOfDay
      morning={editableMorning}
      afternoon={editableAfternoon}
      evening={editableEvening}
    />
  );
}
