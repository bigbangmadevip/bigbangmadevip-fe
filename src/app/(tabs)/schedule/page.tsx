import ScheduleContainer from '@/components/schedule/ScheduleContainer';
import { PageHeader } from '@/components/common/PageHeader';

export default function SchedulePage() {
  return (
    <main>
      <PageHeader title="VIP 총공 일정" />

      <ScheduleContainer />
    </main>
  );
}
