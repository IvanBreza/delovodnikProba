package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FolderTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Folder getFolderSample1() {
        return new Folder().id(1L).folderName("folderName1").folderPath("folderPath1").description("description1");
    }

    public static Folder getFolderSample2() {
        return new Folder().id(2L).folderName("folderName2").folderPath("folderPath2").description("description2");
    }

    public static Folder getFolderRandomSampleGenerator() {
        return new Folder()
            .id(longCount.incrementAndGet())
            .folderName(UUID.randomUUID().toString())
            .folderPath(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
