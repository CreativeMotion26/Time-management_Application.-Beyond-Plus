import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { differenceInWeeks } from 'date-fns';
import { format } from 'date-fns';

// Initial events data
const initialEvents = [
  {
    title: "Science",
    startTime: genTimeBlock("MON", 10),
    endTime: genTimeBlock("MON", 11, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
    color: "#e1bee7",
  },
  {
    title: "Physics",
    startTime: genTimeBlock("WED", 12),
    endTime: genTimeBlock("WED", 12, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
    color: "#f8bbd0",
  },
];

const calculateCurrentWeek = (startDate, currentDate) => {
  return Math.ceil(differenceInWeeks(currentDate, startDate) + 1);
};

const CustomHeader = ({ currentDate }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const datesOfWeek = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay() + i);
    datesOfWeek.push(date);
  }

  return (
    <View style={styles.customHeaderContainer}>
      {daysOfWeek.map((day, index) => {
        const date = datesOfWeek[index];
        const isToday = date.toDateString() === currentDate.toDateString();
        return (
          <View key={index} style={styles.dayContainer}>
            <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
            <Text style={[styles.dateText, isToday && styles.todayDateText]}>{date.getDate()}</Text>
            {isToday && <View style={styles.todayIndicator} />}
          </View>
        );
      })}
    </View>
  );
};

const ScheduleScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [events, setEvents] = useState(initialEvents); // State for events
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [newEvent, setNewEvent] = useState({
    title: '',
    day: '',
    startTime: '',
    endTime: '',
    location: '',
  }); // State for new event details

  const pivotDate = genTimeBlock('mon');
  const numOfDays = 7;
  const navigation = useNavigation();
  const [currentWeek, setCurrentWeek] = useState(1);
  const semesterStartDate = new Date('2024-07-01');
  const totalWeeks = 12;
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const week = calculateCurrentWeek(semesterStartDate, currentDate);
    setCurrentWeek(week);
  }, [currentDate]);

  const handleDatePress = () => {
    setDatePickerVisible(true);
  };

  const onEventPress = (evt) => {
    Alert.alert("onEventPress", JSON.stringify(evt));
  };


  const handleReview = () => {
    navigation.navigate('Review');
  };

  const handleMain = () => {
    navigation.navigate('Main');
  };

  const handleAccount = () => {
    navigation.navigate('Account');
  };

  // Handle opening the modal for adding a new event
  const handleAddPress = () => {
    setModalVisible(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Handle submitting the new event
  const handleAddEvent = () => {
    const { title, day, startTime, endTime, location } = newEvent;
    if (title && day && startTime && endTime && location) {
      const newEventObj = {
        title,
        startTime: genTimeBlock(day.toUpperCase(), parseInt(startTime)),
        endTime: genTimeBlock(day.toUpperCase(), parseInt(endTime)),
        location,
        extra_descriptions: [],
        color: '#f8bbd0', // Example colour
      };
      setEvents([...events, newEventObj]);
      setModalVisible(false);
      setNewEvent({
        title: '',
        day: '',
        startTime: '',
        endTime: '',
        location: '',
      });
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <LinearGradient
        colors={['#2b189e', '#5d4add', '#a38ef9']}
        style={styles.header}
      >
        <Text style={styles.headerText}>BEYOND⁺</Text>
        <View style={styles.headerCenter}>
          <TouchableOpacity onPress={handleDatePress}>
            <Text style={styles.headerCenterText}>{format(currentDate, 'MMMM')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleAddPress}>
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={handleAccount}>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
        </View>
        
      </LinearGradient>

        
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TextInput
              placeholder="Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Day (e.g., MON)"
              value={newEvent.day}
              onChangeText={(text) => setNewEvent({ ...newEvent, day: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Start Time (Hour, e.g., 10)"
              value={newEvent.startTime}
              onChangeText={(text) => setNewEvent({ ...newEvent, startTime: text })}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="End Time (Hour, e.g., 12)"
              value={newEvent.endTime}
              onChangeText={(text) => setNewEvent({ ...newEvent, endTime: text })}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Location"
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Event" onPress={handleAddEvent} />
              <Button title="Cancel" onPress={handleCloseModal} color="red" />
            </View>
          </View>
        </View>
      </Modal>


      <View style={styles.progressContainer}>
        <Text style={styles.weekText}>Week {currentWeek} of {totalWeeks}</Text>
        <ProgressBar 
          progress={currentWeek / totalWeeks} 
          color="#7B68EE" 
          style={styles.progressBar}
        />
      </View>
      <CustomHeader currentDate={currentDate} />
      <TimeTableView
        events={events}
        pivotTime={9}
        pivotEndTime={20}
        pivotDate={pivotDate}
        nDays={numOfDays}
        onEventPress={onEventPress}
        locale="en"
        timeStep={60}
        styles={timetableStyles}
      />


      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleMain}>
          <Ionicons name="calendar" size={24} color="white" />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleReview}>
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.navText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleReview}>
          <Ionicons name="chatbubble" size={24} color="white" />
          <Text style={styles.navText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleAccount}>
          <Ionicons name="book" size={24} color="white" />
          <Text style={styles.navText}>Resume</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="share" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const timetableStyles = {
  container: {
    flex: 1,
  },
  eventCell: {
    borderRadius: 18,
    padding: 10,
  },
  eventTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  headerStyle: {
    backgroundColor: '#D5D6EA',
    height: 8,
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 110,
    backgroundColor: '#7B68EE',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenterText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  customHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    color: '#aaa',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  todayText: {
    fontWeight: 'bold',
    color: '#00aaff',
  },
  todayDateText: {
    color: '#00aaff',
  },
  todayIndicator: {
    width: 4,
    height: 4,
    backgroundColor: '#00aaff',
    borderRadius: 2,
    marginTop: 4,
  },
  progressContainer: {
    padding: 8,
    backgroundColor: '#ffffff',
  },
  weekText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '90%',
    backgroundColor: '#9986FF',
    borderRadius: 30,
    position: 'absolute',
    left: 24,
    right: 0,
    bottom: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    backgroundColor: '#7B68EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#7B68EE'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleScreen;
