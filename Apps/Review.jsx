import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const reviews = [
  {
    id: 1,
    title: 'Design Thinking',
    user: 'Steven',
    review: 'Great class! Highly recommended.',
    likes: 18,
    rating: 4.8,
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  {
    id: 2,
    title: 'Machine Learning',
    user: 'Charlie',
    review: 'Very informative but challenging.',
    likes: 12,
    rating: 4.5,
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  },
  // Add more reviews as needed
];

const Review = () => {
  const navigation = useNavigation();

  const handleReview = () => {
    navigation.navigate('Review');
  };
  const handleMain = () => {
    navigation.navigate('Main');
  };
  const handleAccount = () => {
    navigation.navigate('Account');
  };

  const handlePost = () => {
    // Navigate to a posting page or open a modal to create a new post
    navigation.navigate('Post');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(43,24,158,1)', 'rgba(93,74,221,1)', 'rgba(163,142,249,1)']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>BEYOND⁺</Text>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#ccc"
        />
        <Ionicons name="heart-outline" size={24} color="grey" style={styles.icon} />
      </LinearGradient>

      <View style={styles.body}>
      <View style={styles.tabs}>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Text style={styles.tabText}>Reviews</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Image source={{ uri: review.image }} style={styles.reviewImage} />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewTitle}>{review.title}</Text>
                <Text style={styles.reviewUser}>By: {review.user}</Text>
                <View style={styles.reviewFooter}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={14} color="gold" />
                    <Text style={styles.ratingText}>{review.rating}</Text>
                  </View>
                  <View style={styles.icons}>
                    <Ionicons name="heart-outline" size={24} color="grey" style={styles.icon} />
                    <Ionicons name="play-circle-outline" size={24} color="grey" style={styles.icon} />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="share" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={handleMain}>
          <Ionicons name="calendar" size={24} color="white" />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleReview}>
          <Ionicons name="book" size={24} color="white" />
          <Text style={styles.navText}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={handleAccount}>
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    paddingTop: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    top: 11
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    width: '90%',
    alignSelf: 'center',
    color: 'black',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#7B68EE',
    borderRadius: 20,
  },
  tabText: {
    color: 'white',
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
    paddingTop: 20,
  },
  content: {
    padding: 16,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reviewImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewUser: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 8,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '90%',
    backgroundColor: '#9986FF',
    borderRadius: 30,
    //borderTopRightRadius: 20,
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
});

export default Review;
