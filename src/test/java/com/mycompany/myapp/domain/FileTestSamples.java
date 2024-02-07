package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FileTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static File getFileSample1() {
        return new File().id(1L).fileName("fileName1").filePath("filePath1").fileType("fileType1").size(1L);
    }

    public static File getFileSample2() {
        return new File().id(2L).fileName("fileName2").filePath("filePath2").fileType("fileType2").size(2L);
    }

    public static File getFileRandomSampleGenerator() {
        return new File()
            .id(longCount.incrementAndGet())
            .fileName(UUID.randomUUID().toString())
            .filePath(UUID.randomUUID().toString())
            .fileType(UUID.randomUUID().toString())
            .size(longCount.incrementAndGet());
    }
}
