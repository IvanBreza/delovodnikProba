package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.File;
import com.mycompany.myapp.domain.Folder;
import com.mycompany.myapp.service.dto.FileDTO;
import com.mycompany.myapp.service.dto.FolderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link File} and its DTO {@link FileDTO}.
 */
@Mapper(componentModel = "spring")
public interface FileMapper extends EntityMapper<FileDTO, File> {
    @Mapping(target = "folder", source = "folder", qualifiedByName = "folderId")
    FileDTO toDto(File s);

    @Named("folderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FolderDTO toDtoFolderId(Folder folder);
}
