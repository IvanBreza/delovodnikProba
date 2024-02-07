package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.FileTestSamples.*;
import static com.mycompany.myapp.domain.FolderTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FileTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(File.class);
        File file1 = getFileSample1();
        File file2 = new File();
        assertThat(file1).isNotEqualTo(file2);

        file2.setId(file1.getId());
        assertThat(file1).isEqualTo(file2);

        file2 = getFileSample2();
        assertThat(file1).isNotEqualTo(file2);
    }

    @Test
    void folderTest() throws Exception {
        File file = getFileRandomSampleGenerator();
        Folder folderBack = getFolderRandomSampleGenerator();

        file.setFolder(folderBack);
        assertThat(file.getFolder()).isEqualTo(folderBack);

        file.folder(null);
        assertThat(file.getFolder()).isNull();
    }
}
