package com.mycompany.myapp.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class FileMapperTest {

    private FileMapper fileMapper;

    @BeforeEach
    public void setUp() {
        fileMapper = new FileMapperImpl();
    }
}
