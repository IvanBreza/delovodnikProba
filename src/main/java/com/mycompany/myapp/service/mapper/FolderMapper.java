package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Folder;
import com.mycompany.myapp.service.dto.FolderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Folder} and its DTO {@link FolderDTO}.
 */
@Mapper(componentModel = "spring")
public interface FolderMapper extends EntityMapper<FolderDTO, Folder> {
    @Mapping(target = "parentFolder", source = "parentFolder", qualifiedByName = "folderId")
    FolderDTO toDto(Folder s);

    @Named("folderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FolderDTO toDtoFolderId(Folder folder);
}
