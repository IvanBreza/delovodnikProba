package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Permission;
import com.mycompany.myapp.service.dto.PermissionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Permission} and its DTO {@link PermissionDTO}.
 */
@Mapper(componentModel = "spring")
public interface PermissionMapper extends EntityMapper<PermissionDTO, Permission> {}
