import ScheduleContainer from '@/components/schedule/ScheduleContainer';

export default function SchedulePage() {
  return (
    <main>
      <div className="flex justify-center py-[16px] text-title-17 font-bold">
        VIP 총공 일정
      </div>

      <ScheduleContainer />
    </main>
  );
}
