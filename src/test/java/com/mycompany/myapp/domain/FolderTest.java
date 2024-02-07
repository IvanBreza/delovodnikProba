package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.FileTestSamples.*;
import static com.mycompany.myapp.domain.FolderTestSamples.*;
import static com.mycompany.myapp.domain.FolderTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class FolderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Folder.class);
        Folder folder1 = getFolderSample1();
        Folder folder2 = new Folder();
        assertThat(folder1).isNotEqualTo(folder2);

        folder2.setId(folder1.getId());
        assertThat(folder1).isEqualTo(folder2);

        folder2 = getFolderSample2();
        assertThat(folder1).isNotEqualTo(folder2);
    }

    @Test
    void fileTest() throws Exception {
        Folder folder = getFolderRandomSampleGenerator();
        File fileBack = getFileRandomSampleGenerator();

        folder.addFile(fileBack);
        assertThat(folder.getFiles()).containsOnly(fileBack);
        assertThat(fileBack.getFolder()).isEqualTo(folder);

        folder.removeFile(fileBack);
        assertThat(folder.getFiles()).doesNotContain(fileBack);
        assertThat(fileBack.getFolder()).isNull();

        folder.files(new HashSet<>(Set.of(fileBack)));
        assertThat(folder.getFiles()).containsOnly(fileBack);
        assertThat(fileBack.getFolder()).isEqualTo(folder);

        folder.setFiles(new HashSet<>());
        assertThat(folder.getFiles()).doesNotContain(fileBack);
        assertThat(fileBack.getFolder()).isNull();
    }

    @Test
    void subfolderTest() throws Exception {
        Folder folder = getFolderRandomSampleGenerator();
        Folder folderBack = getFolderRandomSampleGenerator();

        folder.addSubfolder(folderBack);
        assertThat(folder.getSubfolders()).containsOnly(folderBack);
        assertThat(folderBack.getParentFolder()).isEqualTo(folder);

        folder.removeSubfolder(folderBack);
        assertThat(folder.getSubfolders()).doesNotContain(folderBack);
        assertThat(folderBack.getParentFolder()).isNull();

        folder.subfolders(new HashSet<>(Set.of(folderBack)));
        assertThat(folder.getSubfolders()).containsOnly(folderBack);
        assertThat(folderBack.getParentFolder()).isEqualTo(folder);

        folder.setSubfolders(new HashSet<>());
        assertThat(folder.getSubfolders()).doesNotContain(folderBack);
        assertThat(folderBack.getParentFolder()).isNull();
    }

    @Test
    void parentFolderTest() throws Exception {
        Folder folder = getFolderRandomSampleGenerator();
        Folder folderBack = getFolderRandomSampleGenerator();

        folder.setParentFolder(folderBack);
        assertThat(folder.getParentFolder()).isEqualTo(folderBack);

        folder.parentFolder(null);
        assertThat(folder.getParentFolder()).isNull();
    }
}
