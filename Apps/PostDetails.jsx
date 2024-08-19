import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const PostDetails = ({ route }) => {
  const { post } = route.params;
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
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
          <Text style={styles.headerText}></Text>
        </LinearGradient>
    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

    <View style={styles.content}>
    <View style={styles.profileHead}>
        <Image source={{ uri: post.image || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.user}>By: {post.user}</Text>
    </View>
    <Text style={styles.title}>{post.title}</Text>
      
      {post.image && (
                        <Image source={{ uri: post.image }} style={styles.image} />
                      )}
      <Text style={styles.review}>{post.review}</Text>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <Ionicons name="star" size={18} color="gold" />
          <Text style={styles.ratingText}>{post.rating}</Text>
        </View>
        <View style={styles.icons}>
          <Ionicons name="heart-outline" size={24} color="grey" style={styles.icon} />
        </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    top: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginBottom: 20,
    padding: 20,
  },
  content: {
    padding: 20,
    marginTop: -35,
  },
  profileHead: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B68EE',
    marginTop: 5,
  },
  review: {
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 4,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
});

export default PostDetails;
