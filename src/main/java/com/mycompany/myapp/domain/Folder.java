package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Folder.
 */
@Entity
@Table(name = "folder")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Folder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "folder_name", nullable = false)
    private String folderName;

    @NotNull
    @Column(name = "folder_path", nullable = false)
    private String folderPath;

    @Column(name = "description")
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "folder")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "folder" }, allowSetters = true)
    private Set<File> files = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parentFolder")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "files", "subfolders", "parentFolder" }, allowSetters = true)
    private Set<Folder> subfolders = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "files", "subfolders", "parentFolder" }, allowSetters = true)
    private Folder parentFolder;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Folder id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFolderName() {
        return this.folderName;
    }

    public Folder folderName(String folderName) {
        this.setFolderName(folderName);
        return this;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public String getFolderPath() {
        return this.folderPath;
    }

    public Folder folderPath(String folderPath) {
        this.setFolderPath(folderPath);
        return this;
    }

    public void setFolderPath(String folderPath) {
        this.folderPath = folderPath;
    }

    public String getDescription() {
        return this.description;
    }

    public Folder description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<File> getFiles() {
        return this.files;
    }

    public void setFiles(Set<File> files) {
        if (this.files != null) {
            this.files.forEach(i -> i.setFolder(null));
        }
        if (files != null) {
            files.forEach(i -> i.setFolder(this));
        }
        this.files = files;
    }

    public Folder files(Set<File> files) {
        this.setFiles(files);
        return this;
    }

    public Folder addFile(File file) {
        this.files.add(file);
        file.setFolder(this);
        return this;
    }

    public Folder removeFile(File file) {
        this.files.remove(file);
        file.setFolder(null);
        return this;
    }

    public Set<Folder> getSubfolders() {
        return this.subfolders;
    }

    public void setSubfolders(Set<Folder> folders) {
        if (this.subfolders != null) {
            this.subfolders.forEach(i -> i.setParentFolder(null));
        }
        if (folders != null) {
            folders.forEach(i -> i.setParentFolder(this));
        }
        this.subfolders = folders;
    }

    public Folder subfolders(Set<Folder> folders) {
        this.setSubfolders(folders);
        return this;
    }

    public Folder addSubfolder(Folder folder) {
        this.subfolders.add(folder);
        folder.setParentFolder(this);
        return this;
    }

    public Folder removeSubfolder(Folder folder) {
        this.subfolders.remove(folder);
        folder.setParentFolder(null);
        return this;
    }

    public Folder getParentFolder() {
        return this.parentFolder;
    }

    public void setParentFolder(Folder folder) {
        this.parentFolder = folder;
    }

    public Folder parentFolder(Folder folder) {
        this.setParentFolder(folder);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Folder)) {
            return false;
        }
        return getId() != null && getId().equals(((Folder) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Folder{" +
            "id=" + getId() +
            ", folderName='" + getFolderName() + "'" +
            ", folderPath='" + getFolderPath() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
