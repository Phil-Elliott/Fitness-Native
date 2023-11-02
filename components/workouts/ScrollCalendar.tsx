import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import {
  addWeeks,
  subWeeks,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const ScrollCalendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(endOfWeek(new Date()));
  const [days, setDays] = useState<Date[]>();

  useEffect(() => {
    if (!currentWeekStart || !currentWeekEnd) return;

    if (currentWeekStart > currentWeekEnd) return;

    setDays(
      eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd })
    );
  }, [currentWeekStart, currentWeekEnd]);

  const panGesture = Gesture.Pan().onEnd((e) => {
    if (e.translationX < 0) {
      // swipe left
      const newStart = addWeeks(currentWeekStart, 1);
      setCurrentWeekStart(newStart);
      setCurrentWeekEnd(endOfWeek(newStart));
    } else {
      // swipe right
      const newStart = subWeeks(currentWeekStart, 1);
      setCurrentWeekStart(newStart);
      setCurrentWeekEnd(endOfWeek(newStart));
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View className="space-x-4 py-4 flex-row">
        {days?.map((day) => (
          <TouchableOpacity className="w-9 h-9 bg-gray-300 rounded-full justify-center items-center">
            <Text className="text-lg font-bold">{day.getDate()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GestureDetector>
  );
};

export default ScrollCalendar;
