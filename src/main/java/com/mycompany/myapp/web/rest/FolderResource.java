package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Folder;
import com.mycompany.myapp.repository.FolderRepository;
import com.mycompany.myapp.service.FolderService;
import com.mycompany.myapp.service.dto.FileDTO;
import com.mycompany.myapp.service.dto.FolderDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.print.DocFlavor.STRING;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Folder}.
 */
@RestController
@RequestMapping("/api/folders")
public class FolderResource {

    private final Logger log = LoggerFactory.getLogger(FolderResource.class);

    private static final String ENTITY_NAME = "folder";

    private static final String ROOT_FOLDER = "D:/JHIPSTER/tenth/delofodnikFolderi";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FolderService folderService;

    private final FolderRepository folderRepository;

    public FolderResource(FolderService folderService, FolderRepository folderRepository) {
        this.folderService = folderService;
        this.folderRepository = folderRepository;
    }

    /**
     * {@code POST  /folders} : Create a new folder.
     *
     * @param folderDTO the folderDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new folderDTO, or with status {@code 400 (Bad Request)} if the folder has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<FolderDTO> createFolder(@Valid @RequestBody FolderDTO folderDTO) throws URISyntaxException {
        log.debug("REST request to save Folder : {}", folderDTO);
        /*  if (folderDTO.getId() != null) {
            throw new BadRequestAlertException("A new folder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FolderDTO result = folderService.save(folderDTO);
        return ResponseEntity
            .created(new URI("/api/folders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result); */
        FolderDTO f = new FolderDTO();

        f = folderDTO;
        //             -----------------     * ****** KAD SE SNIMI U BAZI DODELICE MU SE ID ******* *   -----------------
        f.setId(1L);
        //          -----------------     * ****** KAD SE SNIMI U BAZI DODELICE MU SE ID ******* *   -----------------

        String newFolderPath = ROOT_FOLDER + File.separator + folderDTO.getFolderPath() + File.separator + folderDTO.getFolderName();

        System.out.println("newFOlder PATH is: " + newFolderPath);

        File newFolder = new File(newFolderPath);

        if (newFolder.mkdirs()) {
            System.out.println("***************************************SUCCESS***************************************");
            return ResponseEntity
                .created(new URI("/api/folders/" + f.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, Long.toString(f.getId())))
                /*   .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, folderDTO.getRelativePathId())) */
                .body(f);
        } else {
            return null; //ResponseEntity.badRequest().<FolderDTO>body("Failed------------------Failed to create folder");
        }
        /*  return ResponseEntity
        .created(new URI("/api/folders/" + f.getId()))
        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, f.getId().toString()))
        .body(f); */
    }

    /**
     * {@code PUT  /folders/:id} : Updates an existing folder.
     *
     * @param id the id of the folderDTO to save.
     * @param folderDTO the folderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated folderDTO,
     * or with status {@code 400 (Bad Request)} if the folderDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the folderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<FolderDTO> updateFolder(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FolderDTO folderDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Folder : {}, {}", id, folderDTO);
        if (folderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, folderDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!folderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FolderDTO result = folderService.update(folderDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, folderDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /folders/:id} : Partial updates given fields of an existing folder, field will ignore if it is null
     *
     * @param id the id of the folderDTO to save.
     * @param folderDTO the folderDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated folderDTO,
     * or with status {@code 400 (Bad Request)} if the folderDTO is not valid,
     * or with status {@code 404 (Not Found)} if the folderDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the folderDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FolderDTO> partialUpdateFolder(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FolderDTO folderDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Folder partially : {}, {}", id, folderDTO);
        if (folderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, folderDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!folderRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FolderDTO> result = folderService.partialUpdate(folderDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, folderDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /folders} : get all the folders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of folders in body.
     */

    //*****************************RETURNS FOLDERS AND FILES FROM ROOT FOLDER************************************************* */

    @GetMapping("")
    public List<FolderDTO> getAllFolders() {
        try {
            Path rootPath = Paths.get(ROOT_FOLDER);
            List<FolderDTO> list = getFolderStructure(rootPath, rootPath.toString());

            for (FolderDTO f : list) {
                /*  System.out.println("*****************" + f.getRelativePathId());
             System.out.println("*****************" + f.getFolderName());
             System.out.println("*****************" + f.getSubfolders()); */
                if (f.getFiles() != null) {
                    //TODO
                    System.out.println("-----------------" + f.getFiles());
                } else {
                    System.out.println("NEMA FAJLOVA");
                }
            }

            return list;
        } catch (IOException e) {
            // Handle exception appropriately
            e.printStackTrace();
            //U realnosti ce da vrati neki error message
            return null;
        }
    }

    private List<FolderDTO> getFolderStructure(Path rootPath, String rootPathString) throws IOException {
        List<FolderDTO> foldersList = Files
            .walk(rootPath, 1, FileVisitOption.FOLLOW_LINKS)
            .filter(path -> !path.equals(rootPath) && Files.isDirectory(path)) // Exclude the root folder and include
            // only directories
            .map(path -> mapToFolder(path, rootPathString))
            .collect(Collectors.toList());

        return foldersList;
    }

    private FolderDTO mapToFolder(Path path, String rootPathString) {
        FolderDTO folder = new FolderDTO();
        if (folder.getRelativePathId() == null) {
            folder.setRelativePathId(generateFolderId(path, rootPathString));
        }
        folder.setFolderPath(getRelativePath(path, rootPathString));
        folder.setFolderName(path.getFileName().toString());
        try {
            if (Files.isDirectory(path)) {
                System.out.println("Directory:=========================== " + path.getFileName());
                List<FolderDTO> subfolders = Files
                    .list(path)
                    .filter(Files::isDirectory)
                    .map(subfolder -> mapToFolder(subfolder, rootPathString))
                    .collect(Collectors.toList());
                folder.setSubfolders(subfolders);

                List<FileDTO> files = Files.list(path).filter(Files::isRegularFile).map(this::mapToFile).collect(Collectors.toList());
                System.out.println("FILE NAME:************************ " + path.getFileName());
                folder.setFiles(files);
            } else {
                // If the path is a file, map it to a FileDTO directly
                System.out.println("FILE NAME:================================ " + path.getFileName());
                FileDTO file = mapToFile(path);
                if (folder.getFiles() != null) {
                    folder.getFiles().add(file);
                }
            }
        } catch (IOException e) {
            // Handle exception appropriately
            e.printStackTrace();
        }

        return folder;
    }

    private String generateFolderId(Path folderPath, String rootPathString) {
        // Use the folder's relative path as an identifier
        if (!((folderPath == null) | (rootPathString == null))) {
            String relativePath = folderPath.toString().substring(rootPathString.length());

            return relativePath.replace(File.separator, "_"); // Replace separators with underscores
        } else {
            return "NEMA";
        }
    }

    private String getRelativePath(Path folderPath, String rootPathString) {
        System.out.println("THIS IS folderPath=========================== " + folderPath);
        String relativePath = folderPath.toString().substring(rootPathString.length());
        System.out.println("relativePath:=========================== relativePath =========== " + relativePath);
        return relativePath;
    }

    private FileDTO mapToFile(Path path) {
        FileDTO file = new FileDTO();
        //  Moglo bi ovde da se generise i setuje file id ako bude bilo potrebe
        file.setFileName(path.getFileName().toString());
        file.setFilePath(getFilePath(path));

        return file;
    }

    private String getFilePath(Path filePath) {
        System.out.println("getRelativeFilePath FILE NAME " + filePath.getFileName());
        String relativePath = filePath.toString();
        System.out.println(
            "getRelativeFilePath FILErelativePath:=========================== relativePath =========== FILE**FILE" + relativePath
        );
        return relativePath;
    }

    //*****************************/RETURNS FOLDERS AND FILES FROM ROOT FOLDER************************************************* */

    //**********************************DOWNLOAD***************************************************
    /**
     *  Ovo bi trebalo u FileResorse
     */
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam String filePath) throws IOException {
        String fullFilePath = ROOT_FOLDER + File.separator + filePath;
        System.out.println("THIS IS FILE PATH ***==========================***  " + filePath);
        System.out.println("THIS IS FULL FILE PATH ***==========================***  " + fullFilePath);
        File file = new File(filePath);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());

        Resource resource = new ByteArrayResource(Files.readAllBytes(file.toPath()));

        return ResponseEntity
            .ok()
            .headers(headers)
            .contentLength(file.length())
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
    }

    //**********************************/DOWNLOAD***************************************************

    //**********************************ZIP AND DOWNLOAD***************************************************

    @PostMapping(value = "/download", produces = "application/zip")
    public void downloadFiles(@RequestBody List<String> filePaths, HttpServletResponse response) {
        System.out.println(
            "downloadFiles======AAAAAAAAAAAAAAAAAAAAAA*******downloadFiles********AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA========downloadFiles"
        );
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment; filename=downloadedFiles.zip");

        System.out.println("fileNames " + filePaths);

        try (ZipOutputStream zipOut = new ZipOutputStream(response.getOutputStream())) {
            for (String fp : filePaths) {
                // Extract everything after the last '\'
                String fileName = getFileName(fp);

                System.out.println("CHECKING FILENMAME-------------------------File Name: " + fileName);
                Path filePath = Paths.get(fp);
                System.out.println("PATH IS=============== " + filePath.toString());
                if (Files.exists(filePath)) {
                    System.out.println("FILE EXISTS=============== " + filePath.toString());
                    ZipEntry zipEntry = new ZipEntry(fileName);

                    zipOut.putNextEntry(zipEntry);
                    Files.copy(filePath, zipOut);
                    zipOut.closeEntry();
                } else {
                    // Handle the case where the file doesn't exist
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    return;
                }
            }
            // zipOut.finish();
        } catch (IOException e) {
            // Handle exceptions appropriately (e.g., log, set response status)
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private static String getFileName(String filePathString) {
        // Find the last occurrence of '\' or '/'
        int lastSeparatorIndex = Math.max(filePathString.lastIndexOf('\\'), filePathString.lastIndexOf('/'));

        // Extract everything after the last '\'
        return lastSeparatorIndex >= 0 ? filePathString.substring(lastSeparatorIndex + 1) : filePathString;
    }

    //**********************************/ZIP AND DOWNLOAD***************************************************

    //**********************************UPLOAD***************************************************
    /**
     *  Ovo bi trebalo u FileResorse
     */
    @PostMapping("/upload")
    public ResponseEntity<Object> handleFileUpload(@RequestPart("file") MultipartFile file, @RequestParam("folderPath") String folderPath) {
        Map<String, String> response = new HashMap<>();
        try {
            // Ensure the folder path is sanitized to prevent directory traversal attacks
            // MAybe for whole path
            // String sanitizedFolderPath = sanitizeFolderPath(folderPath);

            // Create the full path where the file will be saved
            Path filePath = Paths.get(ROOT_FOLDER, folderPath, file.getOriginalFilename());

            // Create the directory if it doesn't exist
            /*   File directory = new File(filePath.getParent().toString());
            if (!directory.exists()) {
                directory.mkdirs();
            } */

            // Save the file
            file.transferTo(filePath.toFile());

            response.put("message", "File uploaded successfully");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("error", "Error uploading file");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    //**********************************/UPLOAD***************************************************

    //**********************************GET Pdf***************************************************
    /*  @GetMapping("/getPdf")
   public ResponseEntity<InputStreamResource> getPdf(@RequestParam String pdfFileName) {
    System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    try {
        // Load the PDF file from the server's file system
        String pdfFilePath = "D:/JHIPSTER/tenth/delofodnikFolderi/Racuni/Izveštaj lekara cenzora (11).pdf";

        // Load the PDF file content into an InputStream using try-with-resources
        try (InputStream pdfInputStream = Files.newInputStream(Paths.get(pdfFilePath))) {
            // Set the appropriate headers
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline; filename=" + pdfFileName);

            // Return the PDF as a ResponseEntity
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new InputStreamResource(pdfInputStream));
        }
    } catch (Exception e) {
        // Handle exceptions appropriately
        log.error("Error while processing getPdf request", e);
        return ResponseEntity
                .badRequest()
                .body(null);
    }
} */
    //**********************************/GET Pdf***************************************************
    @PostMapping("/pdf")
    public ResponseEntity<Resource> getPdf(@RequestBody String filePath) throws IOException {
        /*  try {
        // Decode the filePath
        String decodedFilePath = UriUtils.decode(filePath, "UTF-8");
        System.out.println("DECODED===================================DECODED "+ decodedFilePath);

        // Your logic here using the decodedFilePath

        // ...
    } catch (Exception e) {
        // Handle exceptions
    } */

        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        String fullFilePath = ROOT_FOLDER + File.separator + filePath;
        System.out.println("THIS IS FILE PATH ***==========================***  " + filePath);
        System.out.println("THIS IS FULL FILE PATH ***==========================***  " + fullFilePath);
        File file = new File(filePath);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());

        Resource resource = new ByteArrayResource(Files.readAllBytes(file.toPath()));

        return ResponseEntity
            .ok()
            .headers(headers)
            .contentLength(file.length())
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
    }

    /**
     * {@code GET  /folders/:id} : get the "id" folder.
     *
     * @param id the id of the folderDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the folderDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<FolderDTO> getFolder(@PathVariable Long id) {
        log.debug("REST request to get Folder : {}", id);
        Optional<FolderDTO> folderDTO = folderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(folderDTO);
        /*  File folder = new File(ROOT_FOLDER);
        String[] fileNames = folder.list();

        // Return the list of file names to the frontend.
        return Arrays.asList(fileNames != null ? fileNames : new String[0]); */
    }

    /**
     * {@code DELETE  /folders/:id} : delete the "id" folder.
     *
     * @param id the id of the folderDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long id) {
        log.debug("REST request to delete Folder : {}", id);
        folderService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
