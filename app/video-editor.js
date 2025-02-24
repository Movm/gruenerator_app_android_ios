import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import VideoEditor from './components/VideoEditor/VideoEditor';

export default function VideoEditorScreen() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pickVideo = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
      quality: 1,
    });

    if (result.assets && result.assets[0]) {
      setSelectedVideo(result.assets[0].uri);
    }
  };
  
  return (
    <View style={{ flex: 1, gap: 10, padding: 20 }}>
      <Button title="Video auswählen" onPress={pickVideo} />
      {selectedVideo && <VideoEditor videoUri={selectedVideo} />}
    </View>
  );
} 