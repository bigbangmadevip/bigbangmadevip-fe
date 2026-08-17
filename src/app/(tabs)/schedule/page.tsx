import ScheduleContainer from '@/components/schedule/ScheduleContainer';
import { PageHeader } from '@/components/common/PageHeader';

export default function SchedulePage() {
  return (
    <main>
      <PageHeader title="VIP 총공 일정" />

      <ScheduleContainer />
      <div
        aria-hidden="true"
        className="-mx-5 -mb-[146px] h-[146px] bg-secondary-800"
      />
    </main>
  );
}
