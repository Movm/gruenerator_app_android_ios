import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { VESDK, Configuration } from 'react-native-videoeditorsdk';

interface VideoEditorProps {
  videoUri?: string;
}

export const VideoEditor: React.FC<VideoEditorProps> = ({ videoUri }) => {
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const openEditor = async () => {
    try {
      if (!videoUri) {
        console.warn('Keine Video-URI angegeben');
        return;
      }
      const result = await VESDK.openEditor({ uri: videoUri });
      if (result) {
        console.log('Video wurde erfolgreich bearbeitet:', result);
        // Hier können Sie das bearbeitete Video weiterverarbeiten
      }
    } catch (error) {
      console.error('Fehler beim Öffnen des Editors:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button 
        title="Video bearbeiten" 
        onPress={openEditor}
      />
    </View>
  );
};

export default VideoEditor; 