package com.mycompany.myapp.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Folder} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FolderDTO implements Serializable {

    private Long id;

    private String relativePathId;

    private String folderName;

    private String folderPath;

    private String description;

    private FolderDTO parentFolder;

    private List<FolderDTO> subfolders;

    private List<FileDTO> files;

    public void setFiles(List<FileDTO> files) {
        this.files = files;
    }

    public List<FileDTO> getFiles() {
        return files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getFolderPath() {
        return folderPath;
    }

    public void setFolderPath(String folderPath) {
        this.folderPath = folderPath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FolderDTO getParentFolder() {
        return parentFolder;
    }

    public void setParentFolder(FolderDTO parentFolder) {
        this.parentFolder = parentFolder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FolderDTO)) {
            return false;
        }

        FolderDTO folderDTO = (FolderDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, folderDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FolderDTO{" +
            "id=" + getId() +
            ", folderName='" + getFolderName() + "'" +
            ", folderPath='" + getFolderPath() + "'" +
            ", description='" + getDescription() + "'" +
            ", parentFolder=" + getParentFolder() +
            "}";
    }

    public List<FolderDTO> getSubfolders() {
        return subfolders;
    }

    public void setSubfolders(List<FolderDTO> subfolders) {
        this.subfolders = subfolders;
    }

    public String getRelativePathId() {
        return relativePathId;
    }

    public void setRelativePathId(String relativePathId) {
        this.relativePathId = relativePathId;
    }
}
